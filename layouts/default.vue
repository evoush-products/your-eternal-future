<template>
	<div>
		<div id="fb-root"></div>
		<main>
			<Header/>
			<Nuxt/>


			<div v-if="check[0]">
				<div class="container">
					<div class="row justify-content-center">
						<div class="col-lg-12 col-xs-12 col-sm-12">
							<!-- <pre>
								{{ check }}
							</pre> -->
							<div class="alert alert-warning alert-dismissible fade show" role="alert">
								<strong>Halo {{ check[0].username }}!</strong> Untuk Memulai konsultasi Bersama Dokter Winda Silahkan Memulai Chat Di Bagian Kiri, atau di chatbox yang telah aktif.
								<button type="button" class="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer/>

			<CookieBox/>

			<a href="#" class="back-to-top"><i class="bx bx-up-arrow-alt"></i></a>
			<!-- <div id="preloader"></div> -->

		</main>
	</div>
</template>


<script>
	import Header from '~/components/layouts/Header'
	import Footer from '~/components/layouts/Footer'

	export default {
		components: {
			Header,
			Footer
		},

		data(){
			return {
				users: {},
				consults: [],
				check: {},
				status: '',
				path: this.$router.name
			}
		},

		mounted(){
			this.getChat(this.status),
			this.getDataConsult(),
			this.getFacebookSDK(document, 'script', 'facebook-jssdk'),
			this.getNewContentUpdate(),
			this.$OneSignal.push(() => {
				this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
					if (isEnabled) {
						console.log('Push notifications are enabled!')
					} else {
						console.log('Push notifications are not enabled yet.')
					}
				})
			})

			// window.OneSignal = window.OneSignal || [];
			// OneSignal.push(function() {
			// 	OneSignal.init({
			// 		appId: "15dc915b-fe30-4b1b-b635-63ab40fc8361",
			// 	});
			// });
		},

		methods: {
			async getNewContentUpdate(){
				const workbox = await window.$workbox;
				if (workbox) {
					workbox.addEventListener('installed', (event) => {
						if (event.isUpdate) {
				            // whatever you want to do to let the user know there's an update available
				            console.log("Update content ready, push reloaded browser")
				            this.$swal({
				            	position: 'top-end',
				            	icon: 'success',
				            	title: 'Evoush::Official New Updated Build',
				            	showConfirmButton: false,
				            	timer: 1500
				            })
				        }
				    });
				}
			},

			getFacebookSDK(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
				fjs.parentNode.insertBefore(js, fjs);
			},

			getDataConsult(){

				this.users = localStorage.getItem('consults') ? JSON.parse(localStorage.getItem('consults')) : ''

				this.$axios.get(`https://app.evoush.com/api/evoush/data/consult/${this.users.username}`)
				.then(res => {
					this.consults = res.data.data
					// console.log(this.consults.length)
					if(this.consults.length > 0){
						this.check = this.consults.map(d => {
							return d.username == this.users.username ? d : ''
						})
						// console.log(this.check[0])
						this.status = this.check[0].status
						// console.log(this.status)
						this.getChat(this.status)
					}
				})
				.catch(err => {
					console.log(err)
				})


			},

			getChat(status){
				if(this.status === ""){
					$crisp.push(['do', 'chat:hide'])
				}else{
					if(this.status === "ACTIVE"){
						$crisp.push(['do', 'chat:show'])
						$crisp.push(['do', 'chat:open'])
					}
				}
			},


			Reload(){
				window.location.reload()
			}
		}

	}
</script>


<style>
	:root {
		--primary-color: #fff;
	}
</style>
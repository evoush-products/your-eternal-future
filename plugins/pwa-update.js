
// export default async ({context}) => {
//   const workbox = await window.$workbox;

//   if (!workbox) {
//     console.debug("Workbox couldn't be loaded.");
//     return;
//   }

//   workbox.addEventListener('installed', (event) => {
//     console.log(event)
//     if (!event.isUpdate) {
//       console.debug('The PWA is on the latest version.');
//       return;
//     }

//        this.$swal({
//         position: 'top-end',
//         icon: 'success',
//         title: 'Evoush::Official New Updated Build',
//         showConfirmButton: false,
//         timer: 1500
//       })
//     alert("New build evoush::official")
//     console.debug('There is an update for the PWA, reloading...');
//     window.location.reload();
//   });
// };

export default async (context) => {
  const workbox = await window.$workbox;
  console.log(workbox)

  if (!workbox) {
    console.debug("Workbox couldn't be loaded.");
    return;
  }

  workbox.addEventListener('installed', (event) => {
    if (!event.isUpdate) {
      this.$toast('Evoush::Official is latest version');
      console.debug('The PWA is on the latest version.');
      return;
    }

    console.debug('There is an update for the PWA, reloading...');
    // window.location.reload();
  });
};
export const state = () => {
	test: ''
}

export const  mutations = {
	testData(state) {
		state.test = "Hallo World"
	}
}

export const actions = {

}

export const getters = {
	TesterData: (state) => {
		return state.test
	}
}
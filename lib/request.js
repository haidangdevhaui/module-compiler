module.exports = {
	/**
	 * param object
	 * @type {Object}
	 */
	params: {},

	/**
	 * current route
	 * @type {string}
	 */
	route: '',

	/**
	 * get params
	 * @param  {string} name
	 * @return {string|integer}
	 */
	getParam(name) {
		if (!name) {
			return this.params;
		}
		return this.params[name] || null;
	}
}
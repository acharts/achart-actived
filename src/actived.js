/**
 * @fileOverview 图表中的激活的元素
 * @ignore
 */

	
var Util = require('achart-util');

/**
 * @private
 * @class Chart.Actived
 * 控件可以被激活（active)的扩展
 *
 * 	- [文档地址](http://spmjs.io/docs/achart-actived/)
 * 	- [wiki地址](http://spmjs.io/docs/achart-actived/wiki/)
 */
var Actived = function(){

};

Actived.ATTRS = {

	/**
	 * 是否激活
	 * @type {Boolean}
	 */
	actived : false

}; 

Util.augment(Actived,{
	/**
	 * 是否处于激活状态
	 * @return {Boolean} 激活状态
	 */
	isActived : function(){
		return this.get('actived');
	},
	/**
	 * 设置激活
	 */
	setActived : function(){
		this.setActiveStatus(true);
		this.set('actived',true);
	},
	/**
	 * @protected
	 * 设置图形的激活状态
	 * @param {Boolean} actived 是否激活
	 */
	setActiveStatus : function(actived){
		
	},
	/**
	 * 清除激活
	 */
	clearActived : function(){
		this.setActiveStatus(false);
		this.set('actived',false);
		if(this.clearActivedItem){
			this.clearActivedItem();
		}
	}
});

module.exports = Actived;

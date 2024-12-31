sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], (Controller,
	JSONModel,
	Filter,
	FilterOperator,
	FilterType) => {
	"use strict"

	return Controller.extend("jsontable.controller.Main", {
		onInit() {
			console.log("onInit - Main Controller")
			var oModel = new JSONModel()
			oModel.loadData("/model/my.json")
			// // Get the table instance from the view
			// const table = this.byId("idTable")
			// // Define the model data
			// const data = [
			// 	{ id: 1, name: "John Doe", age: 30 },
			// 	{ id: 2, name: "Jane Smith", age: 25 },
			// 	{ id: 3, name: "Bob Johnson", age: 40 },
			// ]
			// oModel.setData(data)
			this.getView().setModel(oModel)
			console.log(this.getView().getModel());
		},

		onComboBoxSelectionChange:function(oEvent){
			console.log("incombo");
			var oComboBox = oEvent.getSource(); 
			var sSelectedKey = oComboBox.getSelectedKey(); 
			var oTable = this.byId("idTable"); 
			var oBinding = oTable.getBinding("items"); 
			var aFilters = []; 
			if (sSelectedKey) { aFilters.push(new Filter("gender", FilterOperator.EQ, sSelectedKey)); } 
			oBinding.filter(aFilters)
		},
		onSearch: function (oEvent) {
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery && sQuery.length > 0) {
				aFilter.push(
					// for OR query, we add filters like this
					new Filter({
						filters: [
							new Filter("fullName", FilterOperator.Contains, sQuery),
							new Filter("age", FilterOperator.EQ, sQuery),
						],
						and: false,
					})
				// new Filter("creator_name", FilterOperator.Contains, sQuery));
				)}
			var oTable = this.byId("idTable")
			var oBinding = oTable.getBinding("items")
			oBinding.filter(aFilter,FilterType.Application)
		}
	})
})

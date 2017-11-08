jQuery.ui.require(
	[
		"glb/farms/web/devopsfarmslov/util/Formatter",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/thirdparty/sinon",
		"sap/ui/thirdparty/sinon-qunit"
	],
	function (formatter, ResourceModel) {
		"use strict";
		QUnit.module("Formatting functions", {
			beforeEach: function () {
				this._oResourceModel = new ResourceModel({
					bundleUrl : jQuery.sap.getModulePath("glb.farms.web.devopsfarmslov", "/i18n/i18n.properties")
				});
			},
			afterEach: function () {
				this._oResourceModel.destroy();
			}
		});
		QUnit.test("Should return Yes or No based on flag value", function (assert) {
			// Arrange
			// this.stub() does not support chaining and it always return the right data
			// even if with wrong or empty parameter passed to it
			var oModel = this.stub();
			oModel.withArgs("i18n").returns(this._oResourceModel);
			var oViewStub = {
				getModel: oModel
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.showOther.bind(oControllerStub);
			// Assert
			assert.strictEqual(fnIsolatedFormatter(1), "Yes", "Value is correct");
			assert.strictEqual(fnIsolatedFormatter(0), "No", "Value is correct");
			assert.strictEqual(fnIsolatedFormatter(1), "No", "Value is Wrong");
			assert.strictEqual(fnIsolatedFormatter(0), "Yes", "Value is Wrong");
			
		});
		
		QUnit.test("Should return Yes or No based on flag value", function (assert) {
			// Arrange
			// this.stub() does not support chaining and it always return the right data
			// even if with wrong or empty parameter passed to it
			var oModel = this.stub();
			oModel.withArgs("i18n").returns(this._oResourceModel);
			var oViewStub = {
				getModel: oModel
			};
			var oControllerStub = {
				getView: this.stub().returns(oViewStub)
			};
			// System under test
			var fnIsolatedFormatter = formatter.showAllowOther.bind(oControllerStub);
			// Assert
			assert.strictEqual(fnIsolatedFormatter("ANSWER_SET"), true, "Value is correct");
			assert.strictEqual(fnIsolatedFormatter("LIST_SET"), false, "Value is correct");
			assert.strictEqual(fnIsolatedFormatter("ANSWER_SET"), false, "Value is Wrong");
			assert.strictEqual(fnIsolatedFormatter("LIST_SET"), "true", "Value is Wrong");
			
		});
	}
);

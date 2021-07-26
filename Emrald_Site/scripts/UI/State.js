/**
 * @file Functions for handling state info and editing.
 * @copyright 2021 Battelle Energy Alliance
 */

var isDirty = false;

/**
 * Checks if the project has been modified.
 * 
 * @returns {boolean} If the project has been modified.
 */
function isModified() {
  return isDirty;
}

/**
 * Validates data.
 * 
 * @returns {string} An empty string.
 */
function ValidateData() {
  return "";
}

/**
 * Updates the modified state.
 * 
 * @param {boolean} state The new modified state.
 */
function setModified(state) {
  isDirty = state;
}
var stateData = null;

/**
 * Called when the data is loaded.
 * 
 * @param {object} dataObj The data.
 */
function OnLoad(dataObj) {
  stateData = dataObj;
  if (dataObj) {
    var graph = mainApp.graph;
    var parent = graph.getDefaultParent();
    dataObj.dataType = "diagram";
    parent.value = dataObj;
    mainApp.createTreeStructure(dataObj);
    mainApp.LoadData(graph, parent, dataObj.StateList);
    graph.updateOwnership();
    if (typeof UpdateFrameTitle == "function") {
      UpdateFrameTitle("Diagram: " + dataObj.name);
    }
  }
}

/**
 * Gets the data object.
 * 
 * @returns {object} The data object.
 */
function GetDataObject() {
  stateData = stateData || {};
  //NOTE: attributes here must match the FTItem class.
  return stateData;
}

/**
 * Gets the main app.
 * 
 * @returns {simApp#SimApp} The main app.
 */
function getMainApp() {
		return mainApp;
}


/**
 * Gets the sidebar.
 * 
 * @returns {Navigation#Sidebar} The sidebar.
 */
function getSidebar() {
		return mainApp.graph.getDefaultParent().value.sidebar;
}

/**
 * Called when the state is saved.
 */
function OnSave() {
  console.log("State saved.");
  isDirty = false;
}

/**
 * Called when data is changed.
 * 
 * @param {object} dataObj The data object.
 */
function DataChanged(dataObj) {
	stateData = stateData || {};
		var actType = null;
		var evType = null;
	if (dataObj.actType) {
			actType = dataObj.actType;
	}
	if (actType) {
			var isNew = true;
			for (var i = 0; i < stateData.ActionList.length; i++) {
					if (stateData.ActionList[i].Action.id == dataObj.id) {
							for (var j = 0; j < stateData.StateList.length; j++) {
									for (var k = 0; k < stateData.StateList[j].iActions.length; k++) {
											if (stateData.StateList[j].iActions[k].value.id == dataObj.id) {
													var oldName = stateData.StateList[j].iActions[k].name;
													stateData.StateList[j].iActions[k].value = dataObj;
													stateData.StateList[j].iActions[k].name = dataObj.name;
													var indx = stateData.StateList[j].State.immediateActions.indexOf(oldName);
													if (indx >= 0) {
															stateData.StateList[j].State.immediateActions[indx] = dataObj.name;
													}
											}
									}
							}
							
							stateData.ActionList[i] = { Action: dataObj };
							var graph = mainApp.graph;
							var parent = graph.getDefaultParent();
							parent.value = stateData;
							mainApp.createTreeStructure(stateData);
							mainApp.LoadData(graph, parent, stateData.StateList);
							graph.updateOwnership(); 
							isNew = false;
							break;
					}
			}
			if (isNew) {
					stateData.ActionList.push({ Action: dataObj });
			}
		}
		if (dataObj.evType) {
				evType = dataObj.evType;
		}
		if (evType ) {
				var isNew = true;
				for (var i = 0; i < stateData.EventList.length; i++) {
						if (stateData.EventList[i].Event.id == dataObj.id) {
								for (var j = 0; j < stateData.StateList.length; j++) {
										for (var k = 0; k < stateData.StateList[j].iEvents.length; k++) {
												if (stateData.StateList[j].iEvents[k].value.id == dataObj.id) {
														var oldName = stateData.StateList[j].iEvents[k].name;
														stateData.StateList[j].iEvents[k].value = dataObj;
														stateData.StateList[j].iEvents[k].name = dataObj.name;
														var indx = stateData.StateList[j].State.events.indexOf(oldName);
														if (indx >= 0) {
																stateData.StateList[j].State.events[indx] = dataObj.name;
														}
												}
										}

								}
								stateData.EventList[i] = { Event: dataObj };
								var graph = mainApp.graph;
								var parent = graph.getDefaultParent();
								parent.value = stateData;
								mainApp.createTreeStructure(stateData);
								mainApp.LoadData(graph, parent, stateData.StateList);
								graph.updateOwnership();
								isNew = false;
								break;
						}
				}
				if (isNew) {
						stateData.EventList.push({ Event: dataObj });
				}
		}
		if (dataObj.diagramType) {
				var graph = mainApp.graph;
				var parent = graph.getDefaultParent();
				parent.value = stateData;
				mainApp.createTreeStructure(stateData);
				mainApp.LoadData(graph, parent, stateData.StateList);
				graph.updateOwnership();
				if (typeof UpdateFrameTitle == "function") {
						UpdateFrameTitle("Diagram: " + dataObj.name);
				}
			
		}
		if (dataObj.stateType) {
				var isNew = true;
				//TODO oldName is not valid, need to get that some how
				for (var j = 0; j < stateData.sidebar.StateList.length; j++) {
						if (stateData.sidebar.StateList[j].State.id == dataObj.id) {
								var oldName = stateData.sidebar.StateList[j].State.name;
						}
				}
				for (var i = 0; i < stateData.StateList.length; i++) {
						if (stateData.StateList[i].State.id == dataObj.id) {
								stateData.StateList[i].State.value = dataObj;
								var graph = mainApp.graph;
								var parent = graph.getDefaultParent();
								parent.value = stateData;
								mainApp.createTreeStructure(stateData);
								mainApp.LoadData(graph, parent, stateData.StateList);
								graph.updateOwnership();
								isNew = false;
								break;

						}
				}
			
				if (isNew) {
						stateData.StateList.push({ State: dataObj });
				}
		}
		if (dataObj.varScope) {
				//For now I think it is good as is
		}
  console.log("State data changed received.");
}

/**
 * Called when something is changed.
 */
function somethingChanged() {
  isDirty = true;
  if (typeof UpdateBttns === "function")
    UpdateBttns();
}


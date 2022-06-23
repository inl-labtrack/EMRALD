# Diagrams
  Each diagram represents a particular piece of the model and the various conditions or states it can be in.  These pieces correlate to aspects of traditional PRA modeling and range from small-scale components to a large scope, overall plant response and design.  A diagram contains multiple states with the events that can occur, actions that can be executed and variables used.  These all define how the simulation may sift through the diagram over time.<br />
  Additionally, some diagrams designated as "single state" can also be evaluated to a Boolean depending on which state they are currently in. This feature, when combined with a Component Logic Event, can greatly simplify a model. Unlike general plant response diagrams, these diagrams are restricted to only be in one state at a time, in order to execute the evaluation process.

## Creating a New Diagram
  On the Left Navigation Frame, right-click on "Diagrams" and click "New Diagram". <br>
  <div style="width:500px">![Right Click for New Diagram](/images/Modeling/diagrams/NewDiagram1.webp)</div>

  The properties window will open. There are three sections in the window, each corresponding to a different use case. The sections and options available within are described in detail below.
	<div style="width:500px">![New Diagram Dialogue Box](/images/Modeling/diagrams/NewDiagram2.webp)</div>

### Section 1
The first section contains basic information about the diagram. Completing only this section will create a completely empty diagram with the given properties.
- **Type:** The diagram type. The options available by default are "Create New", "Plant", "System", "Component", and "Other". Diagram types are discussed in detail in the [Types of Diagrams](#types-of-diagrams) section. Selecting the "Create New" option will cause additional fields to appear that are described in the [Custom Types](#custom-types) section.
- **Name:** The diagram name.
- **Desc:** The optional diagram description.

### Section 2
  Click "Choose File" to import an existing diagram from another project. A File Explorer window will open and allow you to select a JSON file containing a single diagram and any model elements associated with it. After uploading a diagram, the first section will become greyed out as the name, description, and type will be pulled directly from the uploaded file. If the name of any item in the diagram file conflicts with the name of an item already in the project, the [Conflict Resolution](#conflict-resolution) window will appear. If you would like to import more than one diagram at a time, see the detials for Merge in the [Top Menu Bar](./webUIOverview.md#top-menu-bar) section.<br />
  Additionally, a checkbox labelled "Force conflict resolution" is available in this section. Checking this will cause the conflict resolution window to appear regardless of whether any names in the imported diagram conflict with the project or not.
  <div style="width:500px">![New Diagram Dialogue Box](/images/Modeling/diagrams/NewDiagram_Import.webp)</div>

### Section 3
Finally, you can select a template to use from your local template list. See the [Templates](#templates) section for an explanation of how to add templates. From the templates listed here, you can click whichever template you want to use and it will be highlighted with a darker grey background. Clicking the selected template again will deselect it and the diagram will no longer use any template.<br />
The name and description fields from section 1 are required when using a template. Additionally, the Force Conflict Resolution checkbox in section 2 can also be used to force the conflict resolution window to appear when using a template.
<div style="width:500px">![New Diagram Template](/images/Modeling/diagrams/NewDiagram_Template.webp)</div>

  **Continued for All Options:**
  Once you have completed filling the fields, press "OK". The diagram window will open in the Modeling Area. The diagram name will also appear in the Left Navigation Frame. <br>

## Editing a Diagram

### Edit the Diagram Model
  On the Left Navigation Frame, click on "Diagrams" to expand the menu. Double clicking on the folders will expand them to reveal the individual diagrams. 

  **Option 1:**
  Double click on the individual diagram to open it in the Modeling Area.<br>
<div style="width:500px">![Edit Diagram Model Option 1](/images/Modeling/diagrams/EditDiagram1.png)</div>

  **Option 2:**
  Right-click on the individual diagram then click "Open..." to open it in the Modeling Area.<br>
<div style="width:500px">![Edit Diagram Model Option 2](/images/Modeling/diagrams/EditDiagram2.webp)</div>

### Edit the Diagram Properties
   As shown in Option 2 of Edit the Diagram Model shows, right-clicking on the individual diagrams will open a menu. Click on "Edit Properties..." to edit the basic properties of that diagram. The type, name, and description properties will be available to edit.<br />
   In single state diagrams (like Component and System), a table with a list of states will be displayed. In this table, the checkbox next to the state name can be used to set the boolean value that the diagram will return while in the corresponding state.<br>
<div style="width:500px">![Edit Diagram Properties](/images/Modeling/diagrams/EditDiagramProps.webp)</div>

### Deleting a Diagram
  If your diagram is open in the Modeling Area, first close it by clicking on the [X] in the top right corner of the Diagram window. On the Left Navigation Frame, right-click on the individual diagram and click on "Delete" in the menu that appears.<br>
  <div style="width:500px">![Delete Diagram Step 1](/images/Modeling/diagrams/DeleteDiagram1.webp)</div>

  A confirmation window will appear in the Modeling Area. Click "Yes."<br>
  ![Delete Diagram Step 2](/images/Modeling/diagrams/DeleteDiagram2.png)<br>

  The diagram will be deleted and no longer be listed in the Left Navigation Frame.<br>
  <div style="width:300px">![Delete Diagram Step 3](/images/Modeling/diagrams/DeleteDiagram3.png)</div>

## Elements of a Diagram
  ![Diagram Elements](/images/Modeling/diagrams/DiagramElements.png)

### <span style="color:red"> States </span>
  States are a logical representation for a current condition in a diagram represented by the rectangular blocks. They contain events and actions that perform tasks or direct the simulation to other states. <br> 

  See [States](/guide/Modeling/states.md) for more information.

### <span style="color:blue"> Events </span>
  Events monitor for specified criteria and can have one or more actions that are executed when that criteria is met. <br>

  See [Events](/guide/Modeling/events.md) for more information.

### <span style="color:orange"> Actions </span>
  Actions change the properties or cause movement though a model during a simulation run. <br>

  See [Actions](/guide/Modeling/actions.md) for more information.

### Arrows
  Arrows indicate movement from one state to another. **Solid black arrows** indicate that the state exits the current state and moves to the new state upon completion of the action. <span style="color:green">**Dotted green arrows**</span> indicate that the simulation will not exit the current state, but will add the new state as a "Current State" in the model. <br>

## Types of Diagrams
  The following diagram types are always included by default and correspond to areas of traditional PRA modeling. Users can add additional types that will appear as a folder in the Left Navigation Bar and as an option in the diagram type dropdown menu. The key difference between types of diagrams is if the diagram can only be in a single state or can be in multiple states concurrently.

### Plant
  Plant or Plant Response diagrams are the main scenarios to be evaluated, similar to Event Trees in traditional PRA. 
  These diagrams are "Multiple State" capable meaning that you can be in multiple states at the same time.
  They typically have a starting state such as Normal Operations shown in this diagram. Other states can do general evaluation and movement or can be a key end state.  Here the user defines the various states and events that drive the simulation from an initiating event to a desired key state or ending of the simulation.
   
  ![SamplePlantDiagram](/images/Modeling/diagrams/SamplePlantDiagram.png)
  In this example we are looking for the key states of "Small_Release" and "Large_Release". (See [Key States](states.md#key) for more information) The model starts in "Normal_Operations" and waits for a loss of offsite power "LOSP". When in "LOSP" three things can happen: ECS can fail, CCS and ECS can fail, or 24 hours can pass. These events cause the transition to the corresponding states and then the simulation will terminate.
 
### Component
  Component diagrams are meant to be small diagrams for capturing all behaviors of individual components. All basic events for components in traditional PRA can be captured in a component diagram.
  These diagrams are "Single State" diagrams meaning you can only be in one state at a time and that a boolean value is associated with the different states. At least one state must have a "0" value and at least one state must have a "1" value assigned. (See the Single State Diagrams subsection in [State Properties](./states.md#single-state-diagrams) for more information.) <br>
  ![SampleComponentDiagram](/images/Modeling/diagrams/SampleComponentDiagram.png)
  This example is a pump that has three states, standby, active and failed. When the demand event for the pumps use is triggered, the pump either moves to active or failed depending a random sampling. This would be equivalent to a "Fails to Start" basic event in traditional PRA.
  When in the active state, a failure rate event would sample and determine when the pump will fail and move to the failed state. This is equivalent to a "Fails to Run" basic event in traditional PRA.
  In this example, stop event resets or returns the pump to the standby state.

**Key Points**
  * PRA Basic Events are captured as events in the component states.
  * Events can be shared between different components (common cause).
  * Component diagrams are required to be "Single State Diagrams" meaning the simulation can only be in one of those states at any given time.
  * Each State has a Boolean evaluation value, which can represent things like OK or Failed.

### System
  System diagrams are just a organizational label since they function just like a component diagram and are both "Single State Diagrams" and have a boolean evaluation.<br>
  
  A system a diagram only needs two states, an active and failed. The work is done using a "Component Logic" event that evaluates a model of the components for the system.
  See [Logic Tree](/guide/Modeling/logicTree.md) for more information.
  ![SampleSystemDiagram](/images/Modeling/diagrams/SampleSystemDiagram.png)
  In this example, the CCS system has two states, active and failed. The associated boolean logic tree is evaluated whenever a change is made and if the tree evaluates to a "0," it moves to the failed state.

### Custom Types
  If the "Create New" option is chosen when creating a diagram, additional fields will appear allowing users to create custom diagram types. In the name field, enter the name of the type. This name will appear in the type options when creating subsequent diagrams, and will appear as a folder in the diagrams section of the Left Navigation Bar. Then, select whether the new type is single-state (like [Component diagrams](#component)) or multi-state (like [Plant diagrams](#plant))<br>
<div style="width:500px">![Create New Diagram Type](/images/Modeling/diagrams/CreateNewType.webp)</div>

## Templates

EMRALD's templating system allows users to quickly create diagrams for common scenarios using premade diagram structures. Templates can be added to your project in a variety of ways. Diagrams can be pasted into the project from the clipboard, loaded from individual files, bulk loaded from lists of templates, and loaded from model files. Using any of the methods, if the name of an item included in the template diagram conflicts with the name of an item already present in the project, a universal conflict resolution window will open with options for resolving the naming conflicts.

### Make Template
The simpliest way to make a diagram into a template is to locate the name of the diagram you want to make into a template in the Left Navigation Bar, right-click on it, and select "Make Template". The diagram will become available as a template option when creating new diagrams.

<img src="/images/Modeling/diagrams/MakeTemplate.webp" width="500" />

### Importing & Exporting
As discussed in [Section 2](#section-2) of the Creating a Diagram section, diagrams can be imported by uploading a file containing a single diagram and its associated elements such as states, events, actions, and variables. To automatically create a file suitable for importing, individual diagrams can be exported and saved to their own file. In the Left Navigation Bar, locate the name of the diagram you want to export, right-click on it, and select "Export".

<img src="/images/Modeling/diagrams/ExportDiagram.webp" width="500" />

### Copying & Pasting
Diagrams can be copied directly to the clipboard and pasted into any project. To copy a diagram, locate the name of the diagram you want to copy in the Left Navigation Bar, right-click on it, and select "Copy".

<img src="/images/Modeling/diagrams/CopyDiagram.webp" width="500" />

Then, to paste the diagram, right-click on the Diagrams section header in the Left Navigation Bar and select "Paste". If any names in the pasted diagram conflict with names in the project, the [Conflict Resolution](#conflict-resolution) window will appear.

<img src="/images/Modeling/diagrams/PasteDiagram.webp" width="500" />

### Template Lists
Large numbers of templates are stored in lists in three locations.
1. **Local template list:** Templates you create by clicking "Make Template", use in a project, or import from a file (see below) are stored locally on your computer. They will automatically show up when creating new diagrams in every EMRALD project opened on the same computer. To clear your local template list, click "Clear Templates" from the Templates section of the Project menu in the Top Menu Bar.

<img src="/images/Modeling/diagrams/ClearTemplates.webp" width="500" />

2. **Project template list:** Templates you've used to create diagrams will be saved with the EMRALD project. This means that the templates will be available to use by anyone who opens the same project file.

3. **Importing/exporting template lists:** To bulk import templates, you can import a file containing a list of diagrams by clicking "Import Templates" in the Templates section of the Project menu in the Top Menu Bar. The template diagrams in the file will automatically be added to your local template list and appear as template options when creating new diagrams. Only the templates you use will be saved with the project.

<img src="/images/Modeling/diagrams/ImportTemplates.webp" width="500" />

To export your local template list, click "Export Templates" in the templates section of the Project menu in the Top Menu Bar. This will save your entire list of local templates to a file.

<img src="/images/Modeling/diagrams/ExportTemplates.webp" width="500" />

### Conflict Resolution

When using any of the above methods or merging projects, if the names of any diagrams, events, actions, etc. in the data being imported are already in use in the project open in EMRALD, a window will appear to resolve those naming conflicts before the data can be imported, as names in EMRALD must be unique.

<img src="/images/Modeling/diagrams/ConflictResolution1.webp" width="500" />

The main part of the conflict resolution window is a table listing the names of every item in the imported diagram. Rows in the table can be "locked" by clicking the lock icon in the column labelled "Lock". Locking a row prevents the row from being edited, both directly and by the tools at the top of the window (discussed below). Unlocked rows have a red open lock icon, and locked rows have a green closed lock icon as well as a darker background for the entire row. Items in the diagram that do not have a naming conflict are locked by default to prevent the find/replace tool from changing names unnecessarily.<br />
In the image below, rows 2, 6, and 7 have been locked and are highlighted in red.

<img src="/images/Modeling/diagrams/ConflictResolution2.webp" width="500" />

The action column contains options for how the name conflict should be handled.
- **Ignore:** Prevent the item from being imported at all, and instead, references to that item in the imported diagram will link to the existing item with the same name in the base EMRALD project.
- **Replace:** Replace the item with the same name in the base EMRALD project with the item from the imported diagram. This will overwrite the item completely, including existing references in the project.
- **Rename:** Use the value entered in text field in the "Name" column to replace the name of the item in the imported diagram. This is the default option. As long as there are any items using the rename option in your diagram that have naming conflicts, you will not be able to import the diagram until the conflicts are resolved. When the Rename option is selected, the "Conflict" column will indicate whether the name entered in the Name column conflicts with a name in the base EMRALD project.

At the top of the conflict resolution window are two input fields that allow you to search and replace text within the names of all the unlocked items in the table. In the "Find" input, enter the text you want to replace. In the "Replace with" input, enter the text that it should be replaced with. Assuming the result of the replacement does not still conflict, the replaced rows will be automatically locked.<br />
In the image below, the names in every row except 2, 6, and 7 have replaced "C-CKV-A" from the original name with "C-CKV-C" and been locked. **Rows 2, 6, and 7 were already locked**, so their names were not modified and still conflict.

<img src="/images/Modeling/diagrams/ConflictResolution3.webp" width="500" />

Below the find/replace tool are buttons for conveniently modifying every item in the table at once. First, the "Lock All" and "Unlock All" with automatically lock or unlock every row in the table. The "Ignore Unlocked", "Replace Unlocked", and "Rename Unlocked" buttons will automatically set the action of all unlocked rows.<br />

<!--Copyright 2021 Battelle Energy Alliance-->
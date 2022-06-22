# Variables
Variables define a value that can be stored and modified in events and actions. Variables can also store values from an external code, a document on the user's computer, or the amount of time spent in a state.

## Creating a New Variable

On the Left Navigation Frame, right-click on the variable label and click "New Variable". This can be done from either the All tab or the Global tab.<br> 
<div style="width:300px">![New Variable Step 1](/images/Modeling/variables/NewVar1.png)</div>

Fill out the dialogue box and press "OK". Each field is described in detail below.<br>
<div style="width:500px">![New Variable Step 2](/images/Modeling/variables/NewVar2.webp)</div>
- **Variable Type (Var Type):** Select the variable's type (see [Variable Types](#variable-types) for options).
- **Name:** The name of the variable. The name will be listed in the Left Navigation Frame and be used in code.
- **Description (Desc):** Optional description of the variable.
- **Scope:** Select the variable's scope (see [Variable Scope](#variable-scope) for options).
- **Value:** The initial value of the variable.

- **Reset to initial value for every simulation run:** Check the box to have the variable reset to the initial value at the beginning of every simulation run.

After clicking OK, the variable will be listed in the Left Navigation Frame.<br>
<div style="width:300px">![New Variable Step 3](/images/Modeling/variables/NewVar3.png)</div>

## Editing a Variable
On the Left Navigation Frame, click on the All or Global tab. Only variables with the "global" scope will appear in the Global tab, while all variables regardless of scope will appear in the All tab.<br />
Find the desired variable, right-click on the name in the list, and click "Edit properties".<br>
<div style="width:300px">![Edit Variable Step 1](/images/Modeling/variables/EditVar1.png)</div>

The variable properties dialogue box will appear in the modeling area. Edit your properties as needed and press "OK" to save the changes.<br>
<div style="width:500px">![Edit Variable Step 2](/images/Modeling/variables/EditVar2.webp)</div>

If you would like to save your changes as a new variable instead, check the box "Save As New." Then, after you are done editing the variable, click the "Save As New" to save your changes.<br>
<div style="width:500px">![Edit Variable Step 3](/images/Modeling/variables/EditVar3.webp)</div>

It will be listed in the Left Navigation Frame.<br>
<div style="width:300px">![Edit Variable Step 4](/images/Modeling/variables/EditVar4.png)</div>

## Deleting a Variable
  On the Left Navigation Frame, click on the tab (All or Global) where your variable is located. If you are not sure which tab, click on the All tab. Right-click on the variable and click "Delete".<br>
  <div style="width:300px">![Delete Variable Step 1](/images/Modeling/variables/DeleteVar1.png)</div>

  A confirmation window will appear in the Modeling Area. Click "Yes."<br>
  <div style="width:350px">![Delete Variable Step 2](/images/Modeling/variables/DeleteVar2.png)</div><br>

  The variable will be deleted from the entire model and no longer be listed in the Left Navigation Frame. <br>
  <div style="width:300px">![Delete Event Variable Step 3](/images/Modeling/variables/DeleteVar3.png)</div><br>

## Using Variables in the Model

Variables can be used in many places in the model, either in code for linking with external programs or substituted in for the value of a text field.<br />
The following list includes everywhere variables can be used. Click on any of the items for details about how to use variables with them.
- [Variable Condition Event](events.md#variable-condition)
- [Timer Event](events.md#timer)
- [Failure Rate Event](events.md#failure-rate)
- [External Simulation Event](events.md#external-simulation)
- [Distribution Event](events.md#distribution)
- [Transition Action](actions.md#transition)
- [Change Variable Value Action](actions.md#change-variable-value)
- [External Simulation Message Action](actions.md#external-simulation-message)
- [Run Application Action](actions.md#run-application)

## Variable Scope
Depending on the Scope of variable selected, different options are available.

### Global
Global is the standard scope for variables, and is used for storing simple numbers, strings or booleans. Global variables are available in any item that has a script.

### External Simulation Variables
An external simulation variable connects the EMRALD simulation and an external simulation using the [messaging protocol](xmppProtocol.md). These variables are used by the following items:
- [External Simulation Event](events.md#external-simulation)
- [External Simulation Message Action](actions.md#external-simulation-message)

In the 3DSim ID field, enter the name or identifier of the variable you want to use in the external simulation.<br/>

<img src="/images/Modeling/variables/ExtSimVarEdit.webp" alt="External Simulation Variable Editor Window" width="500"/>

### Document Link Variable 
A document link variable gets its value from an external file. This can be used in situations where you want to use and store values in a separate document for use in multiple EMRALD models, or if you want to draw data from output files created by an external executable. The editor window for a document link variable has additional fields which are shown and explained below.<br/>

<img src="/images/Modeling/variables/DocLinkVarEdit.webp" alt="Document Link Variable Editor Window" width="500"/>

- **Document Type (Doc Type):** The file format of the document that your variable is in: XML, JSON, or Text RegEx (a text file to read using regular expressions). The Text RegEx document type has additional fields described below.
- **Document Path (Doc Path):** The full path to the file on the user's computer.
- **Variable Link (Var Link):** Instructions for how to extract the variable's value from the document.
  - *XML*: An XPath expression pointing to the node whose value to read. An XPath expression tester is available [here](https://www.site24x7.com/tools/xpath-evaluator.html).
  - *JSON*: A JSONPath expression pointing to the property whose value to read. A JSONPath expression tester is available [here](https://jsonpath.com/).
  - *Text RegEx*: A regular expression to match the desired value within generic text. A RegEx expression tester is available [here](https://regexr.com/). Additional fields are available for this document type that are explained below.
  <div style="width:600px">![Regular Expression Document Link Variable Editor Window](/images/Modeling/variables/RegExVarEdit.webp)</div>
- **Doc Path and Var Link must exist on startup:** Check this box if the document and link must exist upon startup of the simulation. A situation in which you would not want this checked is if the document is created during the running of the EMRALD model by an external executable.
- **Line #:** Appears only for the Text RegEx document type. Check this box if you would like to use the value in a line after the regular expression match rather than the same line as the regular expression match. Indexing begins at 0, so 0 to indicates the same line as the match and 1 indicates the next line. When this box is checked, the following two additional settings appear.
- **Beginning Position (Beg Pos):** This is the start position within the line. Indexing begins at 0. To use the first character in the line, type 0.
- **Number of Characters (Num Chars):** Use this to indicate the position of the last character you would like to extract, relative to the beginning position. Set this value to 0 to only use the character in the beginning position, 1 if you would like to use the first two characters starting with the one in the beginning position, and so on. Do not check this box if you would like to select everything until the end of the line.
- **Default:** The value to be returned if no match is found in the document via the variable link.

### Accrual Variable
An accrual variable allows the user to easily adjust a variable depending on how much time is spent in a specified state. For example: determining a radiation dose rate, costs for procedures, or downtime. Accrual variables are always doubles. Follow these steps to set up an accural variable.

The variable type is locked to double when the accrual scope is selected. The editor shows a blank table of State Accrual Variables. These are the states that will influence the value of the variable depending on how long the state is occupied.</br>
<div style="width:500px">![Accrual Variable Editor Window 1](/images/Modeling/variables/Accrual_1.webp)</div>

To add a state to the table, click and drag the state of interest from the Left Navigation Frame to the area where it says Drag States Here. Release your mouse once a small plus sign appears. </br>
<div style="width:500px">![Accrual Variable Editor Window 2](/images/Modeling/variables/Accrual_2.webp)</div>

The state will appear in the table. You will have the option to make it either a Static or Dynamic response. The default is Static which means that the Accrual Rate, the rate at which the variable increases based on the time spent in the state, is constant. The value input is the amount the variable will accrue per the time unit on the right. The unit can be changed as seen in the dropdown menu between days, hours, minute, and seconds. </br>
<div style="width:500px">![Accrual Variable Editor Window Static](/images/Modeling/variables/Accrual_Static.webp)</div>

To switch to the Dynamic type, select the radio button for "Dynamic." The Dynamic type means that the accrual rate will vary with respect to the simulation time passed. For example, if you want the accrual rate to change from 1 per hour to 0.5 per hour after the first ten hours of simulation time, add two rows to the accrual rate table. In the first row, enter 0 for the simulation time and 1 for the accrual rate. In the second row, enter 10 for the simulation time and 0.5 for the accrual rate. The last rate will remain for the rest of the simulation time unless otherwise specified. Like in the Static type, the unit can be changed for the simulation time and accrual rate. When the unit is changed for one, it will change it for both as the units must be the same.</br>

<img src="/images/Modeling/variables/Accrual_Dyn_Unit.webp" alt="Accrual Variable Editor Window Dynamic Units" width="500"/>

Click the button "Add Row" to add a row for entering the rate. </br>
<div style="width:500px">![Accrual Variable Editor Window First Row Add](/images/Modeling/variables/Accrual_Dyn_1.webp)</div>

To add additional rows, click the [+] button on the right-hand side of the accrual rate field or the same "Add Row" button. Either method will add another row right below the first row. </br>
<div style="width:500px">![Accrual Variable Editor Window Second Row Add](/images/Modeling/variables/Accrual_Dyn_2.webp)</div>

To delete a row, click the [X] button on the right-hand side of the the [+] button.

<img src="/images/Modeling/variables/Accrual_Dyn_Delete.webp" alt="Accrual Variable Editor Window Delete Row" width="500"/>

To collapse the rows for the state, click the "Minimize Table" button. The button will change to an "Expand Table" button. Click it again to show all of the table rows.

<img src="/images/Modeling/variables/Accrual_Dyn_Min.webp" alt="Accrual Variable Editor Window Minimize" width="500"/>

To remove the state from the list entirely, click the "Remove This State" button under the name of the state. The window will look like the same as when the Accrual scope was chosen with an empty table.

## Variable Types

 ### Integer
In the dropdown menu for Var Type, integer variables are listed as "int." To set the value, simply enter the value in the value input. Integers must be whole numbers - if you need to use a decimal value, use the "double" variable type instead.</br>
<div style="width:500px">![Integer Variable](/images/Modeling/variables/IntVar.webp)</div>

 ### Double
To input the value of a double, you can enter the value in the field as a decimal or using scientific notation. Scientific notation is entered using E notation. For example, 2.5 * 10^-5 would be entered as 2.5E-5.</br>
<div style="width:500px">![Double Variable](/images/Modeling/variables/DoubleVar.webp)</div>
<div style="width:500px">![Double Variable Using Scientific Notation](/images/Modeling/variables/DoubleVarScientificNotation.webp)</div>

 ### Boolean
In the dropdown menu for Var Type, boolean variables are listed as "bool." To input the value, select true or false from the dropdown menu. </br>
<div style="width:500px">![Boolean Variable](/images/Modeling/variables/BoolVar.webp)</div>

 ### String
To input a value of a string, simply enter the value in the text area.</br>
<div style="width:500px">![String Variable](/images/Modeling/variables/StringVar.webp)</div>

 ### Error Messages
If you type in a value that is not valid for the variable type selected, it will display an error. This error will also display if no value is enter. <br/>
<div style="width:500px">![Variable Type Error](/images/Modeling/variables/VarTypeError.webp)</div>

<!--Copyright 2021 Battelle Energy Alliance-->
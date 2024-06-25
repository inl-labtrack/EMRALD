import {GateType, MainItemType, StateEvalValue} from './ItemTypes'
import {ChangeLog} from './ChangeLog'

export interface LogicNode {
    /**
     * Optional, internal use only.
     */
    id?: string
    /**
     * referenace name in the logic node
     */
    name: string
    /**
     * User entered description of the logic node
     */
    desc: string
    gateType: GateType
    /**
     * Array of component diagram names and state values to use in evaluating if not using the default value.
     */
    compChildren: CompChild[]
    /**
     * Array of logic node names that are children of this gate.
     */
    gateChildren: string[]
    /**
     * Flag indicating that this is to be displayed as a tree top in the UI and can be used in an evaluate logic tree event.
     */
    isRoot: boolean
    changeLog?: ChangeLog
    required?: boolean
  }

export interface LogicNode {
  /**
   * Optional, internal use only.
   */
  id?: string
  objType: MainItemType
  /**
   * referenace name in the logic node
   */
  name: string
  /**
   * User entered description of the logic node
   */
  desc: string
  gateType: GateType
  compChildren: CompChild
  /**
   * Array of logic node names that are children of this gate.
   */
  gateChildren: string[]
  /**
   * Flag indicating that this is to be displayed as a tree top in the UI and can be used in an evaluate logic tree event.
   */
  isRoot: boolean
  changeLog?: ChangeLog
  /**
   * If this is a template then it indicates the item must exist in the current model before using the template.
   */
  required?: boolean
}

export interface CompChildItems {
  stateValues?: StateValues
  /**
   * Name of the diagram to be evaluated
   */
  diagramName: string
}

interface StateValuesItems {
  /**
   * State name for the value.
   */
  stateName: string
  stateValue: StateEvalValue
}
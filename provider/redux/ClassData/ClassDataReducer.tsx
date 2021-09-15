import { SET_DATA_CLASS } from './Constant';
import { ClassDataTypes } from './ClassDataTypes';
import { IClass } from '../../../interface/IClass';

export interface IClassDataState {
  allClass: IClass[];
}

const ClassDataReducerDefaultState: IClassDataState = {
  allClass: [],
};

export const ClassDataReducer = (
  state = ClassDataReducerDefaultState,
  action: ClassDataTypes
): IClassDataState => {
  switch (action.type) {
    case SET_DATA_CLASS: {
      return {
        allClass: action.allClass,
      };
    }
    default:
      return state;
  }
};

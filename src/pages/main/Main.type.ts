import { ITreeResponse } from "../../share/Interfaces";

interface ITreeResponseWithLvl extends ITreeResponse {
    lvl: string;
    child: ITreeResponseWithLvl[];
  }
import { ITreeResponse } from "src/share/Interfaces";

interface ITreeResponseWithLvl extends ITreeResponse {
    lvl: string;
    child: ITreeResponseWithLvl[];
  }
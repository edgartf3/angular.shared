export class ModalMessage {
  body: string;
  title: string;
  confirmClick: any;
  cancelClick: any;
  icon: number;
  confirmCaption: string;
  cancelCaption: string;
  confirmVisible: boolean;
  cancelVisible: boolean;
}


export const Info = 1;
export const Question = 2;
export const Error = 3;

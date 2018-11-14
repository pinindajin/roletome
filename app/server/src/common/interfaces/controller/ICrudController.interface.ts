export interface ICRUDController {
  find(request: any): Promise<any>;
  findOne(request: any): Promise<any>;
  create(request: any): Promise<any>;
  update(request: any): Promise<any>;
  delete(request: any): Promise<any>;
}
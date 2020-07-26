
// Тип наших объектов
export type Item = {
  id: number;
  parentId: number;
  name: string;
  checked: boolean;
};

// alias для document.getElementById
export const byId = (id: number) =>(document.getElementById('chb'+id) as HTMLInputElement); 



export const saveGenderToLocalStorage = (gender: 'boys' | 'girls') => {
  localStorage.setItem('gender', gender);
};

export const getGenderFromLocalStorage = () => {
  return localStorage.getItem('gender') as 'boys' | 'girls' | null;
};

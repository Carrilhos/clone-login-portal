export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('portal', 1);

    request.onerror = () => {
      reject('Erro ao abrir o banco de dados IndexedDB');
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('fornecedor_aguardando', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('nome', 'nome', { unique: false });
      objectStore.createIndex('cep', 'cep', { unique: false });
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('fornecedor_aguardando', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('nome', 'nome', { unique: false });
      objectStore.createIndex('cep', 'cep', { unique: false });
    };
    
  });
}

export const adicionarFornecedorAguardandoIndexedDB = async (cliente) => {
  const db = await openDB();
  const transaction = db.transaction(['fornecedor_aguardando'], 'readwrite');
  const objectStore = transaction.objectStore('fornecedor_aguardando');
  const request = objectStore.add(cliente);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject('Erro ao adicionar Forne ao IndexedDB');
  });
};

export const buscarFornecedorIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(['fornecedor_aguardando'], 'readonly')
  const objectStore = transaction.objectStore('fornecedor_aguardando')
  const request = objectStore.get(1)
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject('Erro ao buscar cliente no IndexedDB')
  });
};
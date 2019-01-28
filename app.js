window.onload = () => {

  document.getElementById('btnAddKey').addEventListener('click', () => {
    firestore.addWithKey({
      title: 'Js tu terror...',
      description: 'El libro maravilloso...',
      autor: 'Maia...',
    })
  })

  document.getElementById('btnAdd').addEventListener('click', () => {
    firestore.add({
      title: 'UX tu terror',
      description: 'Es maravilloso',
      autor: 'Anónimos',
    },
    'DRAMA'
    )
  })

  document.getElementById('btnAddWithMerge').addEventListener('click', () => {
    firestore.addWithMerge('Youtube', 'DRAMA');
  })

  document.getElementById('btnQuerySingle').addEventListener('click', () => {
    firestore.querySingle('DRAMA');
  })

  document.getElementById('queryByTitle').addEventListener('click', () => {
    firestore.queryByTitle('UX tu terror');
  })

  document.getElementById('queryAllPosts').addEventListener('click', () => {
    firestore.queryAllPosts();
  })

  document.getElementById('queryPostsByTitleAndAutor').addEventListener('click', () => {
    firestore.queryPostsByTitleAndAutor('Js tu terror...', 'Maia...');
  })

  document.getElementById('btnupdate').addEventListener('click', () => {
    firestore.update('Web', 'DRAMA');
  })

  document.getElementById('btnUpdateObject').addEventListener('click', () => {
    evento.updateObject('DRAMA');
  })

  document.getElementById('btnDeleteFields').addEventListener('click', () => {
    evento.deleteFields('DRAMA');
  })

  document.getElementById('btnDelete').addEventListener('click', () => {
    evento.delete('DRAMA');
  })

}
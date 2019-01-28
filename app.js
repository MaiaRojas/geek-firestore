window.onload = () => {

  document.getElementById('btnCreaDocumentoUID').addEventListener('click', () => {
    firestore.btnCreaDocumentoUID({
      title: 'Js tu terror...',
      description: 'El libro maravilloso...',
      autor: 'Maia...',
    })
  })

  document.getElementById('btnCreaDocumento').addEventListener('click', () => {
    firestore.creaDocumento('DRAMA',{
      title: 'UX tu terror',
      description: 'Es maravilloso',
      autor: 'Anónimos',
    })
  })

  document.getElementById('btnAñadeNuevoAtributoDocumento').addEventListener('click', () => {
    firestore.btnAñadeNuevoAtributoDocumento('DRAMA','Youtube',);
  })

  document.getElementById('queryDelDocumento').addEventListener('click', () => {
    firestore.queryDocumento('DRAMA');
  })

  document.getElementById('queryTitulo').addEventListener('click', () => {
    firestore.queryTitulo('UX no es tu terror');
  })

  document.getElementById('queryAllPosts').addEventListener('click', () => {
    firestore.queryAllPosts(3);
  })

  document.getElementById('queryPostsByTitleAndAutor').addEventListener('click', () => {
    firestore.queryPostsporTituloAutor('Js tu terror...', 'Maia...');
  })

  document.getElementById('updateAtributo').addEventListener('click', () => {
    firestore.updateAtributo('DRAMA', 'Web');
  })

  document.getElementById('updateObject').addEventListener('click', () => {
    firestore.updateObject('DRAMA');
  })

  document.getElementById('btnDeleteFields').addEventListener('click', () => {
    firestore.deleteAtributos('DRAMA');
  })

  document.getElementById('btnDelete').addEventListener('click', () => {
    firestore.eliminar('DRAMA');
  })

}
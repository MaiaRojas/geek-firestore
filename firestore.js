const bd = firebase.firestore();

window.firestore = {
  btnCreaDocumentoUID: (post) => {
    bd
      .collection('posts')
      .add({
        title: post.title,
        description: post.description,
        autor: post.autor,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        console.log(`Crea el documento con UID => ${docRef.id}`)
      })
  },

  creaDocumento: (id, post) => {
    bd.collection('posts').doc(id).set({
      title: post.title,
      description: post.description,
      autor: post.autor,
      date: firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log('Se crea post :) con ID', id)
  },

  btnAñadeNuevoAtributoDocumento: (id, imageLink) => {
    bd.collection('posts').doc(id).set(
      {
        imageLink: imageLink
      },
      { merge: true }
    )
    console.log(`Al documento con  ${id}, se agrega el atributo imagenlink`)
  },

  queryDocumento: (id) => {
    let ref = bd.collection('posts').doc(id)
    ref.get().then(respDoc => {
      console.log(`Del  documento ${id} =>  El atributo title es ${respDoc.data().title}`)
    })
  },

  queryTitulo: (title) => {
    bd
      .collection('posts')
      .where('title', '==', title)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(
            `Del atributo ( ${title}) => El autor es  ${doc.data().autor}`
          )
        })
      })
  },

  queryAllPosts: (limit) => {
    bd
      .collection('posts')
      .orderBy('title', 'asc')
      .limit(limit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`Todos los Posts (Limit 3 ) => ${doc.data().title}`)
        })
      })
  },

  queryPostsporTituloAutor: (title, autor) => {
    bd
      .collection('posts')
      .where('title', '==', title)
      .where('autor', '==', autor)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(
            `queryPostsporTituloAutor => Title:${title}, autor:${autor} => ${doc.data().description}`
          )
        })
      })
  },

  updateAtributo: (id, imageLink) => {
    let refUser = bd.collection('posts').doc(id)
    console.log(`Del Post => ${id}, se actualiza  el atributo imagenlink con ${imageLink}`)

    refUser.update({
      imageLink: imageLink
    })
  },

  updateObject: (id) => {
    console.log(`Del post => ${id}, se agrega un atributo 'likes.megusta': '1'`)
    let refUser = bd.collection('posts').doc(id)

    refUser.update({
      'likes.megusta': '1'
    })
  },

  deleteAtributos: (id) => {
    console.log(`El post => ${id}, se elimina el atributo imageLink`)
    bd.collection('posts').doc(id).update({
      imageLink: firebase.firestore.FieldValue.delete()
    })
  },

  eliminar: (id) => {
    console.log(`El documento=> ${id}, es eliminado`)
    bd.collection('posts').doc(id).delete()
  }
}

const bd = firebase.firestore();

window.firestore = {
  addWithKey: (post) => {
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

  add: (post, id) => {
    bd.collection('posts').doc(id).set({
      title: post.title,
      description: post.description,
      autor: post.autor,
      date: firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log('Se crea post :)')
  },

  addWithMerge: (imageLink, id) => {
    bd.collection('posts').doc(id).set(
      {
        imageLink: imageLink
      },
      { merge: true }
    )
    console.log(`Al documento ${id}, se agrega el atributo imagenlink`)
  },

  querySingle: (id) => {
    let ref = bd.collection('posts').doc(id)
    ref.get().then(respDoc => {
      console.log(`querySingle postID ${id} => ${respDoc.data().title}`)
    })
  },

  queryByTitle: (title) => {
    bd
      .collection('posts')
      .where('title', '==', title)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(
            `queryByTitle postTitle ${title}=> ${doc.data().title}`
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
          console.log(`allPosts con Limit 3 => ${doc.data().title}`)
        })
      })
  },

  queryPostsByTitleAndAutor: (title, autor) => {
    bd
      .collection('posts')
      .where('title', '==', title)
      .where('autor', '==', autor)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(
            `queryPostsByTitleAndAutor Title:${title}, autor:${autor} => ${doc.data().description}`
          )
        })
      })
  },

  update: (id, imageLink) => {
    let refUser = bd.collection('posts').doc(id)
    console.log(`Post => ${id}, se actualiza imagenlink`)

    refUser.update({
      imageLink: imageLink
    })
  },

  updateObject: (id) => {
    console.log(`Post => ${id}, se agrega post.categoria`)
    let refUser = bd.collection('posts').doc(id)

    refUser.update({
      'likes.megusta': '1'
    })
  },

  deleteFields: (id) => {
    console.log(`Post => ${id}, se elimina imageLink`)
    bd.collection('posts').doc(id).update({
      imageLink: firebase.firestore.FieldValue.delete()
    })
  },

  delete: (id) => {
    console.log(`Post => ${id}, se elimina`)
    this.db.collection('posts').doc(id).delete()
  }
}

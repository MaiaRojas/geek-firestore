class Poster {
  constructor () {
    this.db = firebase.firestore()
    // const settings = { timestampsInSnapshots: true }
    // this.db.settings(settings)
  }

  addWithKey (post) {
    this.db
      .collection('posts')
      .add({
        title: post.title,
        description: post.description,
        autor: post.autor,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(docRef => {
        console.log(`UID is => ${docRef.id}`)
      })
  }

  add (post, id) {
    this.db.collection('posts').doc(id).set({
      title: post.title,
      description: post.description,
      autor: post.autor,
      date: firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log('Se crea post :)')
  }

  addWithMerge (imageLink, id) {
    console.log(`Post => Al documento ${id}, se agrega el atributo imagenlink`)
    this.db.collection('posts').doc(id).set(
      {
        imageLink: imageLink
      },
      { merge: true }
    )
  }

  querySingle (id) {
    let ref = this.db.collection('posts').doc(id)
    ref.get().then(respDoc => {
      console.log(`querySingle postID ${id} => ${respDoc.data().title}`)
    })
  }

  queryByTitle (title) {
    this.db
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
  }

  queryAllPosts (limit) {
    this.db
      .collection('posts')
      .orderBy('title', 'asc')
      .limit(limit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`allPosts con Limit 3 => ${doc.data().title}`)
        })
      })
  }

  queryPostsByTitleAndAutor (title, autor) {
    this.db
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
  }

  update (id, imageLink) {
    let refUser = this.db.collection('posts').doc(id)
    console.log(`Post => ${id}, se actualiza imagenlink`)

    refUser.update({
      imageLink: imageLink
    })
  }

  updateObject (id) {
    console.log(`Post => ${id}, se agrega post.categoria`)
    let refUser = this.db.collection('posts').doc(id)

    refUser.update({
      'likes.megusta': '1'
    })
  }

  deleteFields (id) {
    console.log(`Post => ${id}, se elimina imageLink`)
    this.db.collection('posts').doc(id).update({
      imageLink: firebase.firestore.FieldValue.delete()
    })
  }

  delete (id) {
    console.log(`Post => ${id}, se elimina`)
    this.db.collection('posts').doc(id).delete()
  }

  // batch () {
  //   const batch = this.db.batch()

  //   const ref1 = this.db.collection('comments').doc('ux')
  //   batch.set(ref1, { title: 'UI tu terror' })

  //   const ref2 = this.db.collection('posts').doc('UX')
  //   batch.set(ref2, { title: 'Batch' })

  //   const ref3 = this.db.collection('likes').doc('fb')
  //   batch.set(ref3, { title: 'General' })

  //   batch
  //     .commit()
  //     .then(() => {
  //       console.log('Batch correcto')
  //     })
  //     .catch(error => console.error(error))
  // }
}


window.onload = () => {
  const evento = new Poster()

  document.getElementById('btnAddKey').addEventListener('click', () => {
    evento.addWithKey({
      title: 'Js tu terror...',
      description: 'El libro maravilloso...',
      autor: 'Maia...',
    })
  })

  document.getElementById('btnAdd').addEventListener('click', () => {
    evento.add({
      title: 'UX tu terror',
      description: 'Es maravilloso',
      autor: 'Anónimos',
    },
    'DRAMA'
    )
  })

  document.getElementById('btnAddWithMerge').addEventListener('click', () => {
    evento.addWithMerge('Youtube', 'DRAMA');
  })

  document.getElementById('btnQuerySingle').addEventListener('click', () => {
    evento.querySingle('DRAMA');
  })

  document.getElementById('queryByTitle').addEventListener('click', () => {
    evento.queryByTitle('UX tu terror');
  })

  document.getElementById('queryAllPosts').addEventListener('click', () => {
    evento.queryAllPosts();
  })

  document.getElementById('queryPostsByTitleAndAutor').addEventListener('click', () => {
    evento.queryPostsByTitleAndAutor('Js tu terror...', 'Maia...');
  })

  document.getElementById('btnupdate').addEventListener('click', () => {
    evento.update('Web', 'DRAMA');
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

  document.getElementById('btnBatch').addEventListener('click', () => {
    evento.batch()
  })

}

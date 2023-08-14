import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddAlbum from './components/AddAlbum';
import AlbumsList from './components/AlbumsList';
import UpdateAlbum from './components/UpdateAlbum';



function App() {
  const [albums, setAlbums] = useState([]);
  const [updateAlbum, setUpdateAlbum] = useState({});

  // useEffect for side effects like component did mount.
  useEffect(() => {
    async function fetchAlbums() {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      const json = await response.json();
      setAlbums(json);
    }
    fetchAlbums();
  }, []);

  // deleting in our own state as we can not delet it in server. and placing the updated albums by using setAlbums.
  const deleteAlbumFromList = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE' });
    const newAlbums = albums.filter((album) => album.id !== id);
    alert('Your Album Deleted successfully');
    setAlbums(newAlbums);
  };

  const updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbum) => {
    let updatedAlbum = [];
    if (id < 100) {
      updatedAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: updateUserid,
          id: id,
          title: updateTitle,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json());
    } else {
      updatedAlbum = {
        userId: updateUserid,
        id: id,
        title: updateTitle,
      };
    }
    const updatedAlbums = albums.map((album) => (album.id === id ? updatedAlbum : album));
    setAlbums(updatedAlbums);
    alert('Update Successfully done');
  };

  const addAlbumToList = async (userId, title) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const newAlbum = await response.json();
    setAlbums([...albums, newAlbum]);
    alert('New Album added successfully at the bottom');
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<AlbumsList albums={albums} setUpdateAlbum={setUpdateAlbum} deleteAlbumFromList={deleteAlbumFromList} />}
        />
        <Route path="/add-album" element={<AddAlbum addAlbumToList={addAlbumToList} />} />
        <Route path="/update-album" element={<UpdateAlbum album={updateAlbum} updateAlbumInList={updateAlbumInList} />} />
      </Routes>
    </>
  );
}

export default App;

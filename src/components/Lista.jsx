import {useState, useEffect} from 'react'
import appFirebase from '../firebase/firebase'

import {getFirestore, collection, getDocs, deleteDoc, doc} from 'firebase/firestore'

import { DataGrid } from '@mui/x-data-grid';

const db = getFirestore(appFirebase)

export const Lista = () => {
    const [lista, setLista] = useState([])

    useEffect(() => {
        const getLista = async() => {
            try {
                const querySnapshot = await getDocs(collection(db, 'comidas'))
                const docs = []
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id})
                })
                setLista(docs)
            } catch (error) {
                console.log(error)
            }
        }
        getLista()
    }, [])


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Product', width: 150 },
        { field: 'price', headerName: 'Price', width: 80 },
        { field: 'image', headerName: 'Image', width: 200, 
            renderCell: (params) => (
            <img src={params.row.image} alt={params.row.name} style={{ width: 150, height: 200 }} />
            )
        }
    ];
      
      const rows = lista.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      }))
      
      return (
          <div style = {{ display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <div style={{ height: 470, maxWidth: '80%'}}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[0, 0]}
              checkboxSelection
            />
          </div>
          </div>
        );
      }

    // return (





    //     <div>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th scope = 'col'> Name</th>
    //                     <th scope = 'col'> Price</th>
    //                     <th scope = 'col'> Image</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {lista.map((list)=> (
    //                     <tr key = {list.id}>
    //                         <td>{list.name}</td>
    //                         <td>{list.price}</td>
    //                         <td><img width = {150} height = {200} src={list.image} /></td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // )



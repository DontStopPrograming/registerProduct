import { useState } from 'react'

import { styled, useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import appFirebase from '../firebase/firebase'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { red } from '@mui/material/colors';

const color = red[400]

const db = getFirestore(appFirebase)
const storage = getStorage(appFirebase)

const ButtonFile = styled(Button)(({ theme }) => ({
  marginLeft: '10px',
  marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '15px',
    }
  }))

const TextFieldInput = styled(TextField)(({ theme }) => ({
  backgroundColor : color,
  borderRadius : '5px',
  
  
}))
  


export const Form = () => {
    const [imageUrl, setImageUrl] = useState('')
    const theme = useTheme()
    
    const guardarInfor = async(e) => {
      e.preventDefault()
      const name = e.target.name.value
      const price = e.target.price.value

      const newfood = {
        name: name,
        price: price,
        image: imageUrl,
      }
    try {
      await addDoc(collection(db, 'comidas'), {
        ...newfood
      })
    } catch (error) {
      console.log(error)
    }

    e.target.name.value = ''
    e.target.price.value = ''
    e.target.file.value = ''
    
  }

    const fileHandler = async(e) => {
      const fileI = e.target.files[0]
      const refFile = ref(storage, `documentos/${fileI.name}`)
      await uploadBytes(refFile, fileI)
      const imageUrl = await getDownloadURL(refFile)
      setImageUrl(imageUrl)
      
    }
    
  return (
    <div className = 'card' style = {{ display: 'flex', justifyContent: 'center', padding: '50px'}}>
      <h3 style = {{ textAlign: 'left', padding: '20px', fontSize: '1.7rem'}}> ADD PRODUCT </h3>
      <Box onSubmit = {guardarInfor}>
        <div className = 'form-group'> 
          <TextFieldInput theme = {theme} id = 'name' label = 'Product' defaultValue = 'Fill this'/>
        </div>
        <div className = 'form-group'>
          <TextFieldInput theme = {theme} id = 'price' label = 'Price' defaultValue = 'Fill this'/>
        </div>

        <label htmlFor="file">
        <input
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={fileHandler}
        />
        <ButtonFile component="span" variant="contained" color="primary">
          Select File
        </ButtonFile>
      </label>
    
      <ButtonFile theme = {theme} variant="contained" className = 'btn-primary' endIcon = {<SendIcon />}> Guardar </ButtonFile>
      </Box>
    </div>
  )
}

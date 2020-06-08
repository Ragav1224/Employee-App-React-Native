import React, {useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList, Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee=({navigation,route})=>{

    const getDetails = (type) =>{
        if(route.params){
            switch(type){
                case "name" :
                    return route.params.name
                case "phone" :
                    return route.params.phone
                case "email" :
                    return route.params.email
                case "salary" :
                    return route.params.salary
                case "picture" :
                    return route.params.picture
                case "job" :
                    return route.params.job
            }
        }
        return ""
    }


    const [name,setName]  = useState(getDetails(("name")))
    const [job,setJob]  = useState(getDetails(("job")))
    const [phone,setPhone] = useState(getDetails(("phone")))
    const [email,setEmail] = useState(getDetails(("email")))
    const [salary, setSalary] = useState(getDetails(("salary")))
    const [picture, setPicture] = useState(getDetails(("picture")))
    const [modal, setModal] = useState(false)
    const [enableShift, setEnableShift] = useState(false)

    const submitData = () =>{
        fetch('http://a4949e57.ngrok.io/send-data', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                job,
                phone,
                email,
                salary,
                picture
            })
        })
        .then(res=>res.json)
        .then(data=>{
            // console.log(data)
            Alert.alert(`${name} saved successfully`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    const updateDetails = () =>{
        fetch('http://a4949e57.ngrok.io/update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                job,
                phone,
                email,
                salary,
                picture
            })
        })
        .then(res=>res.json)
        .then(data=>{
            // console.log(data)
            Alert.alert(`${name} updated successfully`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    const pickFromGallary = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5,
              });
              if(!data.cancelled){
                let newFile ={
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }

                handleUpload(newFile)
            }
        }else{
            Alert.alert("Permission need.. You denied access")
        }

    }
    const pickFromCamera = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 0.5,
              });
              if(!data.cancelled){
                  let newFile ={
                      uri:data.uri,
                      type:`test/${data.uri.split(".")[1]}`,
                      name:`test.${data.uri.split(".")[1]}`
                  }

                  handleUpload(newFile)
              }
        }else{
            Alert.alert("Permission need.. You denied access")
        }

    }

    const handleUpload =(image) =>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeApp')
        data.append('cloud_name','Ragav085')

        fetch('https://api.cloudinary.com/v1_1/ragav085/image/upload',{
            method:'post',
            body:data
        }).then(res=>res.json()).
        then(data=>{
            // console.log(data)
            setPicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    return(
        <KeyboardAvoidingView style={styles.root} behavior="position" enabled={enableShift}>
        <View >
            
            <TextInput
                label='Name'
                theme={theme1}
                style={styles.inputStyle,{marginTop:5}}
                value={name}
                onFocus={()=>setEnableShift(false)}
                mode='outlined'
                onChangeText={text => setName(text )}
            />
            <TextInput
                label='Job'
                theme={theme1}
                style={styles.inputStyle}
                value={job}
                onFocus={()=>setEnableShift(false)}
                mode='outlined'
                onChangeText={text => setJob( text )}
            />
            <TextInput
                label='E-mail'
                theme={theme1}
                style={styles.inputStyle}
                value={email}
                onFocus={()=>setEnableShift(false)}
                keyboardType="email-address"
                mode='outlined'
                onChangeText={text => setEmail( text )}
            />
            <TextInput
                label='Phone'
                theme={theme1}
                style={styles.inputStyle}
                value={phone}
                onFocus={()=>setEnableShift(false)}
                keyboardType="number-pad"
                mode='outlined'
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Salary'
                theme={theme1}
                style={styles.inputStyle}
                value={salary}
                onFocus={()=>setEnableShift(true)}
                mode='outlined'
                onChangeText={text => setSalary(text)}
            />

            <Button 
            margin={5}
            style={styles.buttenStyle} 
            icon={picture=="" ? "camera" :"check"} 
            mode="contained" 
            onPress={() => setModal(true)}>
               Image
            </Button>

            {
                route.params?
                <Button 
                    margin={5}
                    style={styles.buttenStyle} 
                    icon="content-save" 
                    mode="contained" 
                    onPress={() => updateDetails()}>
                    Update Details
                </Button>
                :
                <Button 
                    margin={5}
                    style={styles.buttenStyle} 
                    icon="content-save" 
                    mode="contained" 
                    onPress={() => submitData()}>
                    Save
                </Button>
            }
            

            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose = {()=>{
                setModal(false)
            }}
            >
                
               <View style={styles.modeliew}>
                    <View style={styles.buttomView}>
                        <Button 
                            icon="camera" 
                            mode="contained"
                            theme={theme1} 
                            onPress={() => pickFromCamera()}>
                            camera
                        </Button>
                        <Button 
                            icon="file-image" 
                            mode="contained"
                            theme={theme1} 
                            onPress={() => pickFromGallary()}>
                            Gallery
                        </Button>
                    </View>
                    <Button 
                        icon="cancel" 
                        //  mode="contained" 
                         color='#fbfcf5'
                         theme={theme1}
                        onPress={() => setModal(false)}>
                        cancel
                    </Button>
               </View>
                
            </Modal>
            
            
        </View>
        </KeyboardAvoidingView>
    )
}

const theme1 = {
    colors:{
        primary:'#575a5c'
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'#b8b8d9'
    },
    inputStyle:{
        margin:3,
        marginBottom:1,
        marginTop:1,
    },
    buttenStyle:{
       backgroundColor:'#40464a'
    },
    buttomView:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    },
    modeliew:{
        position:'absolute',
        bottom:4,
        width:'100%',
        backgroundColor:'#141f26'
    }
})

export default CreateEmployee
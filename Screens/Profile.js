import React, {useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList, Modal,Linking,Platform, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title,Card,Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile =(props) =>{

    const {_id,name,email,phone,salary,picture,job}= props.route.params.item;

    const deleteEmployee = ()=>{
        fetch("http://a4949e57.ngrok.io/delete",{
            method:'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>res.json())
        .then(deleteEmp=>{
            Alert.alert(`${deleteEmp.name} deleted succesfully`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("Something went wrong")
        })
    }


    const dialNo=()=>{
        if(Platform.OS==='android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telPrompt:${phone}`)
        }
    }

   return(
    <View style={styles.root}>
        <LinearGradient 
            colors={["#0b1ae6", "#43f7d6"]}
            style={{height:"20%"}}
        />
       <View style={{alignItems:'center'}}>
            <Image 
                    style={{width:140,height:140, borderRadius:70, marginTop:-70}}
                    source={{uri:picture}}        
                />
       </View>
       <View style={{alignItems:'center'}}>
           <Title style={{fontSize:25,fontWeight:'bold'}}>{name}</Title>
           <Text style={{fontSize:18,fontStyle:'italic'}}>{job}</Text>
       </View>

       <Card style={styles.myCard} onPress={()=>{
           Linking.openURL(`mailTo:${email}`)
       }}>
           <View style={styles.cardiewStyle}>
                <MaterialIcons name="email" size={35} color="black" />
                <Text style={styles.cardText}>{email}</Text>
           </View>
       </Card>

       <Card style={styles.myCard} onPress={()=>dialNo()}>
           <View style={styles.cardiewStyle}>
                <Entypo name="phone" size={35} color="black" />
                <Text style={styles.cardText}>{phone}</Text>
           </View>
       </Card>
       <Card style={styles.myCard}>
           <View style={styles.cardiewStyle}>
                <MaterialIcons name="attach-money" size={35} color="black" />
                <Text style={styles.cardText}>{salary}</Text>
           </View>
       </Card>
       <View style={styles.buttonView}>
            <Button 
                margin={5}
                style={styles.buttenStyle}
                theme={theme1} 
                icon="account-edit" 
                mode="contained" 
                onPress={() => {
                    props.navigation.navigate("Create",
                    {_id,name,email,phone,salary,picture,job}
                    )
                    }}>
                Edit
            </Button>
            <Button 
                margin={5}
                style={styles.buttenStyle}
                theme={theme1} 
                icon="delete-circle-outline" 
                mode="contained" 
                onPress={() => deleteEmployee()}>
                Remove
            </Button>
           
       </View>

    </View>
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
    },
    myCard:{
        margin:3
    },
    cardiewStyle:{
        flexDirection:'row',
        padding:1
    },
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    },
    cardText:{
        marginTop:5,
        marginLeft:7,
        fontSize:16
    }
})

export default Profile;
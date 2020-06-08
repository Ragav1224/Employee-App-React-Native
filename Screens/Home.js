import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList,ActivityIndicator, Alert } from 'react-native';
import {Card, FAB} from 'react-native-paper';

const Home = (props)=>{

    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = ()=>{
        fetch("http://2e039b4d324b.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const renderList = ((item)=>{
        return(
            <Card style={styles.myCard} key={item._id}
                onPress={()=>props.navigation.navigate("Profile",{item})}
            >
                <Text>
                </Text>
                <View style={styles.cardView}>
                    <Image
                        style={{width:60,height:60,borderRadius:30}}
                        source={{uri:item.picture}}
                    />
                    <View style={styles.text}> 
                        <Text style={{fontSize:20, color: '#282a30'}}>{item.name}</Text>
                        <Text style={{fontSize:20, color: '#282a30'}}>{item.job}</Text>
                    </View>
                </View>
    
            </Card>
        )
    })

    return (
        <View style={{flex:1,backgroundColor:'#434459'}}>
            
            <FlatList 
                data={data}
                renderItem={({item})=>{
                    return (renderList(item))
                }}
                keyExtractor={item=>`${item._id}`}
                onRefresh = {()=>{fetchData()}}
                refreshing={loading}
            />
            
            <FAB onPress={()=>props.navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{
                    accent:'#181824',
                }}}
                // onPress={() => console.log('Pressed')}
            />

        </View>
    )

    
}

const styles = StyleSheet.create({
    myCard:{
        margin:5,
        padding:5,
        backgroundColor:'#888c9e',

        
        
    },
    cardView:{
        padding:6,
        flexDirection:'row',
    },
    text:{
        marginLeft:15,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default Home;
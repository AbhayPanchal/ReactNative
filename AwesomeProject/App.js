// "StAuth10244: I Abhay Panchal, 000813104 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. 
//I have not made my work available to anyone else."

import React, { useState } from 'react';
import { StyleSheet,Button, Text, TextInput, FlatList, View, Image} from 'react-native';

//Function Component

function App() {

  //useState hooks
  const [img, setImages] = useState([]);
  const [term, setTerm] = useState('');
  const [genre, setGenre] = useState([]);

  const [term2, setTerm2] = useState('');


  //Call to the Web Api to fetch the data
  
  async function getSearchResults()
  {
    try {
      const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' +term+ '&camera=fhaz&api_key=FQCqo9vKqpeYJcu1ejtqnpGtPchTMb4SemCWjtZJ');
      const json = await response.json();

      //set the value of photos
      setImages(json.photos);
      
    } catch (error) { console.error(error); }   
  }

   //Call to the Web Api to fetch the data

  async function getSearchResult()
  {
    try {
      const response = await fetch('https://quote-garden.herokuapp.com/api/v3/quotes?genre=' + term2);
      const json = await response.json();

      //set the value of Genre 
      setGenre(json.data);
      
    } catch (error) { console.error(error); }   
  }
  
  // displays the Images and Quotes returned from the API in a FlatList
  return (
    <div>

      <View>
      <Text  style={styles.c}> Native Application With Nasa Images And Good Thoughts! </Text><br/><br/>

      </View>

      <View>
        <Text  style={styles.a}> NASA Camera Pictures </Text><br/><br/>

        <TextInput
        style={{height: 40, width: '100%', padding: 20, backgroundColor: 'lightblue'}}
        placeholder="Search Information with number any num from 100 to 3300"
        onChangeText={term => setTerm(term)}
      />
      <Button style={styles.but} onPress={getSearchResults} title="Search"  />
    </View>
    <View style={styles.container}>

   <br/><br/>
      <View  style={styles.square} >
        <FlatList
            data={img}
            //style={{font: 100}}
            renderItem={({item}) => <div><Text style={styles.b}>Camera Name : {item.camera.full_name}</Text> 
            </div>  }
            keyExtractor={item => item.id} />
      </View>
      <View  style={styles.square} >
      <FlatList
            data={img}
            //style={{font: 100}}
            renderItem={({item}) => <div><Text style={styles.b}></Text> <Image style={{ width: 150, height: 200 }} 
            source={{ uri: `${item.img_src}` }} /> </div>  }
            keyExtractor={item => item.id} />
      </View>
      <View  style={styles.square} >
      <FlatList
            data={img}
            //style={{font: 100}}
            renderItem={({item}) => <div><Text style={styles.b}>Date: {item.earth_date}</Text> </div>  }
            keyExtractor={item => item.id} />

      </View>
    </View>

    <View>

    <Text  style={styles.a}> Good Quotes and authors </Text>

    </View>

    <View style={styles.d}>
    <TextInput
          style={{height: 40, width: '100%', padding: 20}}
          placeholder="Search Genres Ex. age, time, buisness etc."
          onChangeText={term2 => setTerm2(term2)}
        />
        <Button style={styles.but} onPress={getSearchResult} title="Search"  />
        <FlatList
            data={genre}
            //style={{font: 100}}
            renderItem={({item}) => <Text  style={styles.b}>Author : {item.quoteAuthor}<br/>Text: {item.quoteText}<br/>Genre: {item.quoteGenre}<br/><br/></Text>}
            keyExtractor={item => item.id} />
    </View>
  </div>
  );
};

const styles = StyleSheet.create({

  body:{
    padding : 20,
    backgroundColor : 'red',
  },

  container: {
    flex: 1,
    padding: 30,
    flexDirection : 'row',
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: 'lightblue'
  },

  d: {
    backgroundColor: 'lightblue'
  },

  a: {
    textAlign: 'center',
    fontWeight: 'bold',
    
    fontSize: 40,
  },

  c:{
    textAlign: 'center',
    fontWeight: 'bold',
    
    fontSize: 50,
    backgroundColor: 'red',
  },

  b: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  square: {
   
    width: 300,
    height: 300,
    margin: 4,
  },
  but: {
    padding: 30,
    width: '50%',
    color: 'red',
  }
});

export default App;
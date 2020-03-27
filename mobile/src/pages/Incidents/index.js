import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import styles from './styles';

import logo from '../../assets/logo.png';

export default function App({navigation}) {
  const [incidents, setIncidents] = useState();

  useEffect(() => {
    api
      .get('incidents?page_size=20')
      .then(res => setIncidents(res.data.incidents))
      .catch(err =>
        console.warn(err.response ? err.response.data : err.message),
      );
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', incident);
  }

  const totalCases = incidents ? incidents.length : '?';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalCases} casos</Text>
          .
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia
      </Text>

      {incidents && incidents.length ? (
        <FlatList
          style={styles.incidentList}
          data={incidents}
          keyExtractor={i => `${i.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({item: i}) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{i.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{i.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>R$ {i.value}</Text>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigateToDetail(i)}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Icon name="arrow-right" size={16} color="#e02041" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.noIncidentsContainer}>
          <Text style={styles.noIncidentsText}>
            {incidents ? 'No incidents' : 'Loading...'}
          </Text>
        </View>
      )}
    </View>
  );
}

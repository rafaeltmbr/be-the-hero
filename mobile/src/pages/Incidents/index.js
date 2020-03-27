/* eslint-disable no-undef */
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';
import styles from './styles';

import logo from '../../assets/logo.png';

export default function App({navigation}) {
  const [incidents, setIncidents] = useState();
  const [totalCount, setTotalCount] = useState('?');
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  function loadIncidents() {
    if (loading) {
      return;
    }

    if (totalCount === (incidents && incidents.length)) {
      return;
    }

    setLoading(true);

    api
      .get('incidents', {
        params: {
          page: currentPage + 1,
        },
      })
      .then(res => {
        const newIncidents = incidents
          ? incidents.concat(res.data.incidents)
          : res.data.incidents;
        setIncidents(newIncidents);
        setTotalCount(parseInt(res.headers['x-total-count'], 10));
        setCurrentPage(currentPage + 1);
      })
      .catch(err =>
        console.warn(err.response ? err.response.data : err.message),
      )
      .finally(() => setLoading(false));
  }
  useEffect(loadIncidents, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', incident);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalCount} casos</Text>
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
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({item: i}) => (
            <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
              <Text style={styles.incidentValue}>{i.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{i.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
                  .format(i.value)
                  .replace(/^(\D+)/, '$1 ')}
              </Text>

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

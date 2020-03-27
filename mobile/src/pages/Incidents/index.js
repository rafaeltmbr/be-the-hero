import React from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './styles';

import logo from '../../assets/logo.png';

export default function App() {
  const navigation = useNavigation();
  const ongName = 'APAD';
  //const ongId = '1313304a';

  function navigateToDetail(incident) {
    navigation.navigate('Detail');
  }

  const totalCases = 2;

  const incidents = [
    {
      id: 1,
      title: 'Lolly 1',
      description:
        'Lolly é uma cachorra que acabou de parir 16 filhotes e precisa de ajuda para comprar fraldas.',
      value: '65,00',
    },
    {
      id: 2,
      title: 'Lolly 2',
      description:
        'Lolly é uma cachorra que acabou de parir 16 filhotes e precisa de ajuda para comprar fraldas.',
      value: '65,00',
    },
    {
      id: 3,
      title: 'Lolly 3',
      description:
        'Lolly é uma cachorra que acabou de parir 16 filhotes e precisa de ajuda para comprar fraldas.',
      value: '65,00',
    },
  ];

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

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={i => `${i.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item: i}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{ongName}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{i.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>R$ {i.value}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={navigateToDetail}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Icon name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

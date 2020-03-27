/* eslint-disable no-undef */
import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import email from 'react-native-email';

import styles from './styles';
import logo from '../../assets/logo.png';

export default function Detail({navigation, route}) {
  const incident = route.params || {};

  const value = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
    .format(incident.value)
    .replace(/^(\D+)/, '$1 ');

  const message =
    `Olá ${incident.name}, estou entrando em contato pois gostaria ` +
    `de ajudar no caso "${incident.title}" com o valor de ${value}.`;

  function handleBackpress() {
    navigation.goBack();
  }

  function sendEmail() {
    const to = incident.email;
    email(to, {
      subject: `Herói do caso: ${incident.title}`,
      body: message,
    }).catch(err => console.warn('Send email error:', err.message));
  }

  function senWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`,
    ).catch(err => console.warn('Send WhatsApp error:', err.message));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />
        <TouchableOpacity onPress={handleBackpress}>
          <Icon name={'arrow-left'} size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={[styles.incidentValue, styles.lastIncidentValue]}>
          {value}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={senWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

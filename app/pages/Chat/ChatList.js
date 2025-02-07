import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const PASTEL_COLORS = {
  blue: '#cee7e6',    // Azul pastel
  green: '#eae3ef',   // Verde pastel
  red: '#f2eee9',     // Vermelho pastel
  yellow: '#f3dfde',  // Amarelo pastel
};

const payments = [
  {
    id: 1,
    description: 'Mensalidade Janeiro 2025',
    value: 'R$ 499,90',
    date: '05/01/2025',
    status: 'paid',
    method: 'Cartão de Crédito'
  },
  {
    id: 2,
    description: 'Mensalidade Dezembro 2024',
    value: 'R$ 499,90',
    date: '05/12/2024',
    status: 'paid',
    method: 'Cartão de Crédito'
  },
  {
    id: 3,
    description: 'Mensalidade Novembro 2024',
    value: 'R$ 499,90',
    date: '05/11/2024',
    status: 'paid',
    method: 'Boleto'
  },
  {
    id: 4,
    description: 'Mensalidade Outubro 2024',
    value: 'R$ 499,90',
    date: '05/10/2024',
    status: 'paid',
    method: 'Boleto'
  },
  {
    id: 5,
    description: 'Mensalidade Setembro 2024',
    value: 'R$ 499,90',
    date: '05/09/2024',
    status: 'paid',
    method: 'Pix'
  }
];

const FinanceiroScreen = () => {
  const { colors } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return PASTEL_COLORS.green;
      case 'pending':
        return PASTEL_COLORS.yellow;
      case 'overdue':
        return PASTEL_COLORS.red;
      default:
        return PASTEL_COLORS.blue;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Cartão de Crédito':
        return 'credit-card';
      case 'Boleto':
        return 'barcode';
      case 'Pix':
        return 'qrcode';
      default:
        return 'money';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financeiro</Text>
        
        <View style={styles.summary}>
          <View style={[styles.summaryCard, { backgroundColor: PASTEL_COLORS.blue }]}>
            <View style={styles.iconContainer}>
              <FontAwesome name="money" size={24} color="#777777" />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Total Pago</Text>
              <Text style={styles.summaryValue}>R$ 2.499,50</Text>
            </View>
          </View>
          
          <View style={[styles.summaryCard, { backgroundColor: PASTEL_COLORS.green }]}>
            <View style={styles.iconContainer}>
              <FontAwesome name="calendar" size={24} color="#777777" />
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.summaryLabel}>Próximo Pagamento</Text>
              <Text style={styles.summaryValue}>05/02/2025</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.paymentsList}>
        {payments.map((payment) => (
          <TouchableOpacity 
            key={payment.id}
            style={[styles.paymentCard, { backgroundColor: getStatusColor(payment.status) }]}
            activeOpacity={0.7}
          >
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentDescription}>{payment.description}</Text>
              <Text style={styles.paymentDate}>{payment.date}</Text>
              
              <View style={styles.paymentMethod}>
                <FontAwesome 
                  name={getMethodIcon(payment.method)} 
                  size={14} 
                  color="#777777" 
                  style={styles.methodIcon}
                />
                <Text style={styles.methodText}>{payment.method}</Text>
              </View>
            </View>
            
            <View style={styles.paymentValue}>
              <Text style={styles.valueText}>{payment.value}</Text>
              {payment.status === 'paid' && (
                <FontAwesome name="check-circle" size={16} color="#777777" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444444',
  },
  paymentsList: {
    padding: 20,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
    marginRight: 15,
  },
  paymentDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444444',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    marginRight: 6,
  },
  methodText: {
    fontSize: 13,
    color: '#666666',
  },
  paymentValue: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  valueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 4,
  },
});

export default FinanceiroScreen;
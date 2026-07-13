import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotationsAPI } from '../../api';
import {
  Card,
  Row,
  StatusBadge,
  Divider,
  LoadingSpinner,
  Button,
} from '../../components/common';
import { Colors, Typography, Spacing } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { format } from 'date-fns';

type Route = RouteProp<FinanceStackParams, 'QuotationDetail'>;
type Nav = NativeStackNavigationProp<FinanceStackParams>;

const QuotationDetailScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const { data: q, isLoading } = useQuery({
    queryKey: ['quotation', params.id],
    queryFn: () => quotationsAPI.getById(params.id).then(r => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: () => quotationsAPI.delete(params.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quotations'] });
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Failed to delete quotation'),
  });

  const confirmDelete = () => {
    Alert.alert('Delete Quotation', `Remove QT-${q?.quotationNumber || ''}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteMutation.mutate() },
    ]);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!q)
    return (
      <View style={styles.center}>
        <Text>Not found</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card
          style={[
            styles.heroCard,
            { borderLeftColor: Colors.accent, borderLeftWidth: 6 },
          ]}
          shadow="lg"
        >
          <Row justify="space-between" align="flex-start">
            <View>
              {q.quotationNumber ? (
                <Text style={styles.qno}>QT-{q.quotationNumber}</Text>
              ) : null}
              <Text style={styles.client}>{q.clientName}</Text>
              {q.createdAt ? (
                <Text style={styles.date}>
                  {format(new Date(q.createdAt), 'dd MMM yyyy')}
                </Text>
              ) : null}
            </View>
            <StatusBadge status={q.status || 'draft'} />
          </Row>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>AMOUNT</Text>
          <Divider style={{ marginVertical: Spacing.sm }} />
          <Text style={styles.totalAmount}>
            ₹{(q.total || q.amount || 0).toLocaleString('en-IN')}
          </Text>
        </Card>

        {q.items && q.items.length > 0 ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>LINE ITEMS</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            {q.items.map((item: any, idx: number) => (
              <Row key={idx} justify="space-between" style={styles.lineItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>
                    {item.name || item.description}
                  </Text>
                  {item.quantity ? (
                    <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
                  ) : null}
                </View>
                <Text style={styles.itemPrice}>
                  ₹
                  {(
                    item.total ||
                    item.amount ||
                    item.price * item.quantity ||
                    0
                  ).toLocaleString('en-IN')}
                </Text>
              </Row>
            ))}
          </Card>
        ) : null}

        {q.notes ? (
          <Card style={styles.card}>
            <Text style={styles.sectionTitle}>NOTES</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <Text style={styles.notes}>{q.notes}</Text>
          </Card>
        ) : null}

        <Row gap={Spacing.sm} style={{ marginTop: Spacing.sm }}>
          <Button
            label="EDIT QUOTATION"
            variant="outline"
            onPress={() => navigation.navigate('QuotationForm', { id: params.id })}
            style={{ flex: 1 }}
          />
          <Button
            label="DELETE QUOTATION"
            variant="destructive"
            onPress={confirmDelete}
            loading={deleteMutation.isPending}
            style={{ flex: 1 }}
          />
        </Row>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: Spacing.base, paddingBottom: 24 },
  heroCard: { padding: Spacing.lg, marginBottom: Spacing.sm },
  qno: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
  },
  client: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 4,
  },
  card: { padding: Spacing.md, marginBottom: Spacing.sm },
  sectionTitle: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1.5,
  },
  totalAmount: {
    fontSize: Typography['3xl'],
    fontWeight: Typography.black,
    color: Colors.accent,
    letterSpacing: -1,
  },
  lineItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  itemName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  itemMeta: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  itemPrice: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  notes: {
    fontSize: Typography.sm,
    color: Colors.foreground,
    fontWeight: Typography.medium,
    lineHeight: 20,
  },
});

export default QuotationDetailScreen;

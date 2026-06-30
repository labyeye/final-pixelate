import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoicesAPI, clientsAPI } from '../../api';
import {
  Input,
  Button,
  Row,
  LoadingSpinner,
  Divider,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Route = RouteProp<FinanceStackParams, 'InvoiceForm'>;
type Nav = NativeStackNavigationProp<FinanceStackParams>;

const STATUS_OPTIONS = ['unpaid', 'partial', 'paid'];

const InvoiceFormScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const isEdit = !!params?.id;

  const [clientName, setClientName] = useState('');
  const [clientId, setClientId] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('0');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('unpaid');
  const [dueDate, setDueDate] = useState('');

  const [showClientPicker, setShowClientPicker] = useState(false);

  // Fetch clients to auto-fill or pick
  const { data: clients = [], isLoading: loadingClients } = useQuery({
    queryKey: ['clients-lookup'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  // If edit, fetch current invoice
  const { data: invoice, isLoading: loadingInvoice } = useQuery({
    queryKey: ['invoice-form-edit', params?.id],
    queryFn: () => invoicesAPI.getById(params.id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (invoice && isEdit) {
      setClientName(invoice.clientName || '');
      setClientId(invoice.clientId || '');
      setInvoiceNumber(invoice.invoiceNumber ? String(invoice.invoiceNumber) : '');
      setAmount(invoice.total ? String(invoice.total) : invoice.amount ? String(invoice.amount) : '');
      setPaidAmount(invoice.paidAmount ? String(invoice.paidAmount) : '0');
      setDescription(invoice.description || '');
      setStatus(invoice.status || 'unpaid');
      setDueDate(invoice.dueDate ? invoice.dueDate.slice(0, 10) : '');
    }
  }, [invoice, isEdit]);

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? invoicesAPI.update(params.id!, data)
        : invoicesAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
      if (isEdit) {
        qc.invalidateQueries({ queryKey: ['invoice', params.id] });
      }
      Alert.alert('Success', `Invoice ${isEdit ? 'updated' : 'created'} successfully!`);
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Failed to save invoice'),
  });

  const handleSave = () => {
    if (!clientName.trim()) {
      Alert.alert('Error', 'Client name is required');
      return;
    }
    if (!amount.trim() || isNaN(Number(amount))) {
      Alert.alert('Error', 'Valid total amount is required');
      return;
    }

    const payload = {
      clientName,
      clientId: clientId || undefined,
      invoiceNumber: invoiceNumber ? Number(invoiceNumber) : undefined,
      amount: Number(amount),
      total: Number(amount),
      paidAmount: Number(paidAmount),
      status,
      description,
      dueDate: dueDate || undefined,
    };

    saveMutation.mutate(payload);
  };

  if (isEdit && loadingInvoice) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isEdit ? 'EDIT INVOICE' : 'NEW INVOICE'}</Text>
        <Divider style={{ marginVertical: Spacing.sm }} />

        {/* Client Selection */}
        <Text style={styles.sectionLabel}>CLIENT DETAILS *</Text>
        <Row justify="space-between" align="center" style={styles.pickerTrigger}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pickerLabel}>
              {clientName || 'Choose Client...'}
            </Text>
          </View>
          <Button
            label={showClientPicker ? 'HIDE' : 'SELECT'}
            size="sm"
            variant="outline"
            onPress={() => setShowClientPicker(!showClientPicker)}
          />
        </Row>

        {showClientPicker && (
          <Card style={styles.pickerCard}>
            <ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled>
              {loadingClients ? (
                <LoadingSpinner size="small" />
              ) : clients.length === 0 ? (
                <Text style={styles.pickerItemText}>No clients found</Text>
              ) : (
                clients.map((c: any) => (
                  <TouchableOpacity
                    key={c._id || c.id}
                    style={styles.pickerItem}
                    onPress={() => {
                      setClientName(c.name);
                      setClientId(c._id || c.id);
                      setShowClientPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{c.name}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </Card>
        )}

        <Input
          label="MANUAL CLIENT NAME (If not in list)"
          value={clientName}
          onChangeText={setClientName}
          placeholder="Client / Company Name"
        />

        <Input
          label="INVOICE NUMBER"
          value={invoiceNumber}
          onChangeText={setInvoiceNumber}
          placeholder="e.g. 1024"
          keyboardType="numeric"
        />

        <Input
          label="TOTAL AMOUNT (₹) *"
          value={amount}
          onChangeText={setAmount}
          placeholder="e.g. 15000"
          keyboardType="numeric"
        />

        <Input
          label="PAID AMOUNT (₹)"
          value={paidAmount}
          onChangeText={setPaidAmount}
          placeholder="e.g. 5000"
          keyboardType="numeric"
        />

        <Input
          label="DUE DATE (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="2025-04-15"
        />

        <Text style={styles.label}>STATUS</Text>
        <Row gap={8} style={{ marginBottom: Spacing.md }}>
          {STATUS_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.statusChip,
                status === opt && styles.statusChipActive,
              ]}
              onPress={() => setStatus(opt)}
            >
              <Text
                style={[
                  styles.statusChipText,
                  status === opt && styles.statusChipTextActive,
                ]}
              >
                {opt.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </Row>

        <Input
          label="DESCRIPTION / NOTES"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter details of service..."
          multiline
          numberOfLines={4}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Button
          label={saveMutation.isPending ? 'SAVING...' : 'SAVE INVOICE'}
          onPress={handleSave}
          loading={saveMutation.isPending}
          fullWidth
          size="lg"
          style={{ marginTop: Spacing.md }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.base, paddingBottom: 40 },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.black,
    color: Colors.foreground,
    letterSpacing: -0.5,
  },
  sectionLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 1,
    marginBottom: 6,
  },
  pickerTrigger: {
    borderWidth: Border.widthHeavy,
    borderColor: Colors.border,
    borderRadius: Border.radius,
    backgroundColor: Colors.white,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  pickerLabel: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  pickerCard: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    borderWidth: Border.width,
    borderColor: Colors.border,
    padding: Spacing.sm,
  },
  pickerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },
  pickerItemText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.semiBold,
    color: Colors.foreground,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  statusChip: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: Border.width,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  statusChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusChipText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
  },
  statusChipTextActive: {
    color: Colors.white,
  },
});

export default InvoiceFormScreen;

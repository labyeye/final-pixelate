import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotationsAPI, clientsAPI } from '../../api';
import {
  Input,
  Button,
  Row,
  Card,
  LoadingSpinner,
  Divider,
} from '../../components/common';
import { Colors, Typography, Spacing, Border, Shadows } from '../../theme';
import { FinanceStackParams } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Route = RouteProp<FinanceStackParams, 'QuotationForm'>;
type Nav = NativeStackNavigationProp<FinanceStackParams>;

interface LineItem {
  name: string;
  price: number;
  quantity: number;
}

const STATUS_OPTIONS = ['draft', 'sent', 'accepted', 'rejected'];

const QuotationFormScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const isEdit = !!params?.id;

  const [clientName, setClientName] = useState('');
  const [clientId, setClientId] = useState('');
  const [quotationNumber, setQuotationNumber] = useState('');
  const [status, setStatus] = useState('draft');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LineItem[]>([{ name: '', price: 0, quantity: 1 }]);

  const [showClientPicker, setShowClientPicker] = useState(false);

  // Fetch clients
  const { data: clients = [], isLoading: loadingClients } = useQuery({
    queryKey: ['clients-lookup'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  // If edit, fetch quotation details
  const { data: quote, isLoading: loadingQuote } = useQuery({
    queryKey: ['quotation-form-edit', params?.id],
    queryFn: () => quotationsAPI.getById(params.id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (quote && isEdit) {
      setClientName(quote.clientName || '');
      setClientId(quote.clientId || '');
      setQuotationNumber(quote.quotationNumber ? String(quote.quotationNumber) : '');
      setStatus(quote.status || 'draft');
      setNotes(quote.notes || '');
      if (quote.items && quote.items.length > 0) {
        setItems(
          quote.items.map((i: any) => ({
            name: i.name || i.description || '',
            price: Number(i.price || i.amount || 0),
            quantity: Number(i.quantity || 1),
          }))
        );
      }
    }
  }, [quote, isEdit]);

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? quotationsAPI.update(params.id!, data)
        : quotationsAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['quotations'] });
      if (isEdit) {
        qc.invalidateQueries({ queryKey: ['quotation', params.id] });
      }
      Alert.alert('Success', `Quotation ${isEdit ? 'updated' : 'created'} successfully!`);
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Failed to save quotation'),
  });

  const handleAddItem = () => {
    setItems([...items, { name: '', price: 0, quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: keyof LineItem, val: any) => {
    const next = [...items];
    if (field === 'price') {
      next[index].price = isNaN(Number(val)) ? 0 : Number(val);
    } else if (field === 'quantity') {
      next[index].quantity = isNaN(Number(val)) ? 1 : Number(val);
    } else {
      next[index].name = val;
    }
    setItems(next);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSave = () => {
    if (!clientName.trim()) {
      Alert.alert('Error', 'Client name is required');
      return;
    }
    if (items.some(i => !i.name.trim())) {
      Alert.alert('Error', 'Please enter a name for all line items');
      return;
    }

    const payload = {
      clientName,
      clientId: clientId || undefined,
      quotationNumber: quotationNumber ? Number(quotationNumber) : undefined,
      status,
      notes,
      items: items.map(i => ({
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        total: i.price * i.quantity,
      })),
      total: calculateTotal(),
    };

    saveMutation.mutate(payload);
  };

  if (isEdit && loadingQuote) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isEdit ? 'EDIT QUOTATION' : 'NEW QUOTATION'}</Text>
        <Divider style={{ marginVertical: Spacing.sm }} />

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
          label="MANUAL CLIENT NAME"
          value={clientName}
          onChangeText={setClientName}
          placeholder="Client / Company Name"
        />

        <Input
          label="QUOTATION NUMBER"
          value={quotationNumber}
          onChangeText={setQuotationNumber}
          placeholder="e.g. 504"
          keyboardType="numeric"
        />

        <Text style={styles.sectionLabel}>LINE ITEMS *</Text>
        {items.map((item, idx) => (
          <Card key={idx} style={styles.itemCard} shadow="sm">
            <Row justify="space-between" align="center" style={{ marginBottom: 8 }}>
              <Text style={styles.itemNumber}>ITEM #{idx + 1}</Text>
              {items.length > 1 && (
                <TouchableOpacity onPress={() => handleRemoveItem(idx)}>
                  <Text style={styles.removeBtn}>✕ REMOVE</Text>
                </TouchableOpacity>
              )}
            </Row>

            <Input
              value={item.name}
              onChangeText={val => handleUpdateItem(idx, 'name', val)}
              placeholder="Item Name / Service Description"
            />

            <Row gap={12}>
              <View style={{ flex: 2 }}>
                <Text style={styles.inputLabel}>PRICE (₹)</Text>
                <TextInput
                  style={styles.numericInput}
                  value={String(item.price)}
                  onChangeText={val => handleUpdateItem(idx, 'price', val)}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>QTY</Text>
                <TextInput
                  style={styles.numericInput}
                  value={String(item.quantity)}
                  onChangeText={val => handleUpdateItem(idx, 'quantity', val)}
                  keyboardType="numeric"
                  placeholder="1"
                />
              </View>
              <View style={{ flex: 1.5, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text style={styles.itemTotalLabel}>TOTAL</Text>
                <Text style={styles.itemTotalVal}>
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </Text>
              </View>
            </Row>
          </Card>
        ))}

        <Button
          label="+ ADD LINE ITEM"
          variant="outline"
          onPress={handleAddItem}
          style={{ marginBottom: Spacing.md }}
        />

        <Card style={styles.summaryCard}>
          <Row justify="space-between">
            <Text style={styles.sumLabel}>GRAND TOTAL:</Text>
            <Text style={styles.sumValue}>
              ₹{calculateTotal().toLocaleString('en-IN')}
            </Text>
          </Row>
        </Card>

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
          label="QUOTATION NOTES"
          value={notes}
          onChangeText={setNotes}
          placeholder="Validity, Payment Terms, Project Scope..."
          multiline
          numberOfLines={4}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Button
          label={saveMutation.isPending ? 'SAVING...' : 'SAVE QUOTATION'}
          onPress={handleSave}
          loading={saveMutation.isPending}
          fullWidth
          size="lg"
          style={{ marginTop: Spacing.md, marginBottom: 20 }}
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
    marginBottom: Spacing.sm,
    marginTop: Spacing.xs,
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
  itemCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderColor: Colors.border,
  },
  itemNumber: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
  },
  removeBtn: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.destructive,
  },
  inputLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.foreground,
    marginBottom: 4,
  },
  numericInput: {
    borderWidth: Border.width,
    borderColor: Colors.border,
    borderRadius: Border.radius,
    backgroundColor: Colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: Typography.base,
    color: Colors.foreground,
    fontWeight: Typography.bold,
  },
  itemTotalLabel: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: Colors.mutedForeground,
  },
  itemTotalVal: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderColor: Colors.border,
    borderLeftColor: Colors.accent,
    borderLeftWidth: 4,
    marginBottom: Spacing.lg,
  },
  sumLabel: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
  },
  sumValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.accent,
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

export default QuotationFormScreen;

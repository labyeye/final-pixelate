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
import { onboardingAPI, clientsAPI } from '../../api';
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

type Route = RouteProp<FinanceStackParams, 'OnboardingForm'>;
type Nav = NativeStackNavigationProp<FinanceStackParams>;

const OnboardingFormScreen = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const qc = useQueryClient();
  const isEdit = !!params?.id;

  const [clientName, setClientName] = useState('');
  const [clientId, setClientId] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectType, setProjectType] = useState('Website');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [techStack, setTechStack] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [deliverables, setDeliverables] = useState('Discovery Call\nWireframes\nDesign\nDevelopment');
  const [status, setStatus] = useState('pending');

  const [showClientPicker, setShowClientPicker] = useState(false);

  // Fetch clients for autocomplete
  const { data: clients = [], isLoading: loadingClients } = useQuery({
    queryKey: ['clients-lookup'],
    queryFn: () => clientsAPI.getAll().then(r => r.data),
  });

  // Fetch onboarding details for editing
  const { data: onboarding, isLoading: loadingOnboarding } = useQuery({
    queryKey: ['onboarding-form-edit', params?.id],
    queryFn: () => onboardingAPI.getById(params.id!).then(r => r.data),
    enabled: isEdit,
  });

  useEffect(() => {
    if (onboarding && isEdit) {
      setClientName(onboarding.clientName || '');
      setClientId(onboarding.clientId || '');
      setCompany(onboarding.company || '');
      setEmail(onboarding.email || '');
      setPhone(onboarding.phone || '');
      setProjectTitle(onboarding.projectTitle || '');
      setProjectType(onboarding.projectType || 'Website');
      setBudget(onboarding.budget ? String(onboarding.budget) : '');
      setStartDate(onboarding.startDate ? onboarding.startDate.slice(0, 10) : '');
      setDeadline(onboarding.deadline ? onboarding.deadline.slice(0, 10) : '');
      setTechStack(Array.isArray(onboarding.techStack) ? onboarding.techStack.join(', ') : onboarding.techStack || '');
      setScopeOfWork(Array.isArray(onboarding.scopeOfWork) ? onboarding.scopeOfWork.join('\n') : onboarding.scopeOfWork || '');
      setDeliverables(Array.isArray(onboarding.deliverables) ? onboarding.deliverables.join('\n') : onboarding.deliverables || '');
      setStatus(onboarding.status || 'pending');
    }
  }, [onboarding, isEdit]);

  useEffect(() => {
    if (!isEdit && clientId) {
      const c = clients.find((x: any) => (x._id || x.id) === clientId);
      if (c) {
        setClientName(c.name || '');
        setCompany(c.companyName || c.name || '');
        setEmail(c.email || '');
        setPhone(c.phone || '');
      }
    }
  }, [clientId, clients, isEdit]);

  const saveMutation = useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? onboardingAPI.update(params.id!, data)
        : onboardingAPI.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['onboarding'] });
      Alert.alert('Success', `Onboarding record ${isEdit ? 'updated' : 'created'} successfully!`);
      navigation.goBack();
    },
    onError: () => Alert.alert('Error', 'Failed to save onboarding details'),
  });

  const handleSave = () => {
    if (!clientName.trim()) {
      Alert.alert('Error', 'Client name is required');
      return;
    }
    if (!projectTitle.trim()) {
      Alert.alert('Error', 'Project title is required');
      return;
    }

    const payload = {
      clientName,
      clientId: clientId || undefined,
      company,
      email,
      phone,
      projectTitle,
      projectType,
      budget,
      startDate: startDate || undefined,
      deadline: deadline || undefined,
      techStack: techStack.split(',').map(s => s.trim()).filter(Boolean),
      scopeOfWork: scopeOfWork.split('\n').map(s => s.trim()).filter(Boolean),
      deliverables: deliverables.split('\n').map(s => s.trim()).filter(Boolean),
      status,
    };

    saveMutation.mutate(payload);
  };

  if (isEdit && loadingOnboarding) return <LoadingSpinner />;

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isEdit ? 'EDIT ONBOARDING' : 'NEW ONBOARDING'}</Text>
        <Divider style={{ marginVertical: Spacing.sm }} />

        {/* Client Picker */}
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
                      setClientId(c._id || c.id);
                      setClientName(c.name);
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
          label="COMPANY"
          value={company}
          onChangeText={setCompany}
          placeholder="Company Name"
        />

        <Input
          label="CLIENT EMAIL"
          value={email}
          onChangeText={setEmail}
          placeholder="email@client.com"
          keyboardType="email-address"
        />

        <Input
          label="CLIENT PHONE"
          value={phone}
          onChangeText={setPhone}
          placeholder="+91..."
        />

        <Divider style={{ marginVertical: Spacing.sm }} />
        <Text style={styles.sectionLabel}>PROJECT SCOPE & TIMELINE</Text>

        <Input
          label="PROJECT TITLE *"
          value={projectTitle}
          onChangeText={setProjectTitle}
          placeholder="e.g. Website Redesign"
        />

        <Input
          label="PROJECT TYPE"
          value={projectType}
          onChangeText={setProjectType}
          placeholder="e.g. Website, Mobile App, Branding"
        />

        <Input
          label="ESTIMATED BUDGET"
          value={budget}
          onChangeText={setBudget}
          placeholder="e.g. 80000"
          keyboardType="numeric"
        />

        <Input
          label="START DATE (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="2025-04-01"
        />

        <Input
          label="TARGET DELIVERY (YYYY-MM-DD)"
          value={deadline}
          onChangeText={setDeadline}
          placeholder="2025-06-01"
        />

        <Input
          label="TECHNOLOGY STACK (Comma-separated)"
          value={techStack}
          onChangeText={setTechStack}
          placeholder="React, Node.js, Tailwind"
        />

        <Input
          label="SCOPE OF WORK (One item per line)"
          value={scopeOfWork}
          onChangeText={setScopeOfWork}
          placeholder="Interactive Dashboard&#10;Stripe Payments&#10;Admin Portal"
          multiline
          numberOfLines={4}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Input
          label="DELIVERABLES (One item per line)"
          value={deliverables}
          onChangeText={setDeliverables}
          placeholder="Discovery Call&#10;Wireframes&#10;Design Figma&#10;Deployment"
          multiline
          numberOfLines={4}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Text style={styles.label}>STATUS</Text>
        <Row gap={8} style={{ marginBottom: Spacing.md }}>
          {['pending', 'active', 'completed'].map(opt => (
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

        <Button
          label={saveMutation.isPending ? 'SAVING...' : 'SAVE ONBOARDING'}
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

export default OnboardingFormScreen;

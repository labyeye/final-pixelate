import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { whatsappAPI } from '../../api';
import {
  Card,
  Row,
  SearchBar,
  EmptyState,
  LoadingSpinner,
} from '../../components/common';
import { Colors, Typography, Spacing, Border } from '../../theme';
import { format } from 'date-fns';

const WhatsAppInboxScreen = () => {
  const [search, setSearch] = useState('');
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['whatsapp-inbox'],
    queryFn: () => whatsappAPI.getInbox().then(r => r.data),
  });

  if (isLoading) return <LoadingSpinner />;

  const items = Array.isArray(messages) ? messages : [];
  const filtered = items.filter(
    (m: any) =>
      !search ||
      m.from?.toLowerCase().includes(search.toLowerCase()) ||
      m.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const conversations = filtered.reduce(
    (acc: Record<string, any[]>, msg: any) => {
      const key = msg.from || msg.phone || 'unknown';
      if (!acc[key]) acc[key] = [];
      acc[key].push(msg);
      return acc;
    },
    {},
  );

  const convList = Object.entries(conversations).map(([phone, msgs]) => ({
    phone,
    name: msgs[0]?.name || msgs[0]?.profileName || phone,
    lastMsg: msgs[msgs.length - 1],
    count: msgs.length,
  }));

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.whatsappBadge}>
            <Text style={styles.whatsappBadgeText}>💬 WHATSAPP INBOX</Text>
          </View>
        </View>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search conversations..."
        />
        <Text style={styles.count}>{convList.length} CONVERSATIONS</Text>
        <FlatList
          data={convList}
          keyExtractor={item => item.phone}
          ListEmptyComponent={
            <EmptyState
              title="No Messages"
              subtitle="WhatsApp messages will appear here"
            />
          }
          renderItem={({ item }) => (
            <Card style={styles.card} shadow="sm">
              <Row align="center" gap={Spacing.md}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {(item.name || 'W').charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.convInfo}>
                  <Row justify="space-between" align="center">
                    <Text style={styles.convName}>{item.name}</Text>
                    {item.lastMsg?.timestamp ? (
                      <Text style={styles.convTime}>
                        {format(
                          new Date(
                            item.lastMsg.timestamp * 1000 ||
                              item.lastMsg.timestamp,
                          ),
                          'HH:mm',
                        )}
                      </Text>
                    ) : null}
                  </Row>
                  <Text style={styles.lastMsg} numberOfLines={1}>
                    {item.lastMsg?.text?.body ||
                      item.lastMsg?.body ||
                      item.lastMsg?.message ||
                      '...'}
                  </Text>
                </View>
                {item.count > 1 ? (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                ) : null}
              </Row>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: Spacing.base, paddingBottom: 0 },
  header: { marginBottom: Spacing.base },
  whatsappBadge: {
    backgroundColor: '#25D366',
    borderWidth: Border.widthBold,
    borderColor: Colors.black,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  whatsappBadgeText: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.white,
    letterSpacing: 1,
  },
  count: {
    fontSize: Typography.sm,
    fontWeight: Typography.black,
    color: Colors.mutedForeground,
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  card: { marginBottom: Spacing.sm, padding: Spacing.md },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: '#25D366',
    borderWidth: Border.width,
    borderColor: Colors.border,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.xl,
    fontWeight: Typography.black,
    color: Colors.white,
  },
  convInfo: { flex: 1 },
  convName: {
    fontSize: Typography.base,
    fontWeight: Typography.black,
    color: Colors.foreground,
  },
  convTime: {
    fontSize: Typography.xs,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
  },
  lastMsg: {
    fontSize: Typography.sm,
    color: Colors.mutedForeground,
    fontWeight: Typography.medium,
    marginTop: 2,
  },
  countBadge: {
    backgroundColor: '#25D366',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: Typography.xs,
    fontWeight: Typography.black,
    color: Colors.white,
  },
});

export default WhatsAppInboxScreen;

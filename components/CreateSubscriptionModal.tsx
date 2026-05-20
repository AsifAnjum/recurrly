import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import clsx from 'clsx';

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    price: number;
    billing: string;
    category: string;
    paymentMethod: string;
    plan: string;
  }) => void;
}

const CATEGORIES = ['Design', 'Developer Tools', 'AI Tools', 'Entertainment', 'Cloud'];
const BILLING_OPTIONS = ['Monthly', 'Yearly'];

export default function CreateSubscriptionModal({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billing, setBilling] = useState('Monthly');
  const [category, setCategory] = useState('Design');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [plan, setPlan] = useState('');

  const handleSubSubmit = () => {
    if (!name.trim() || !price.trim()) return;
    
    onSubmit({
      name,
      price: parseFloat(price) || 0,
      billing,
      category,
      paymentMethod: paymentMethod.trim() || 'Visa ending in 0000',
      plan: plan.trim() || 'Standard Plan',
    });

    // Reset fields
    setName('');
    setPrice('');
    setBilling('Monthly');
    setCategory('Design');
    setPaymentMethod('');
    setPlan('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="modal-overlay">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-end"
        >
          <View className="modal-container">
            <View className="modal-header">
              <Text className="modal-title">New Subscription</Text>
              <Pressable onPress={onClose} className="modal-close">
                <Text className="modal-close-text">×</Text>
              </Pressable>
            </View>

            <ScrollView className="modal-body" contentContainerStyle={{ paddingBottom: 40 }}>
              <View className="auth-field">
                <Text className="auth-label">Subscription Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Spotify"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  className="auth-input"
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Monthly / Yearly Price ($)</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="0.00"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  keyboardType="decimal-pad"
                  className="auth-input"
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Billing Cycle</Text>
                <View className="picker-row">
                  {BILLING_OPTIONS.map((option) => (
                    <Pressable
                      key={option}
                      onPress={() => setBilling(option)}
                      className={clsx(
                        'picker-option',
                        billing === option && 'picker-option-active'
                      )}
                    >
                      <Text
                        className={clsx(
                          'picker-option-text',
                          billing === option && 'picker-option-text-active'
                        )}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((cat) => (
                    <Pressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={clsx(
                        'category-chip',
                        category === cat && 'category-chip-active'
                      )}
                    >
                      <Text
                        className={clsx(
                          'category-chip-text',
                          category === cat && 'category-chip-text-active'
                        )}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Plan Name (Optional)</Text>
                <TextInput
                  value={plan}
                  onChangeText={setPlan}
                  placeholder="e.g. Premium Family"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  className="auth-input"
                />
              </View>

              <View className="auth-field">
                <Text className="auth-label">Payment Method (Optional)</Text>
                <TextInput
                  value={paymentMethod}
                  onChangeText={setPaymentMethod}
                  placeholder="e.g. Visa ending in 4242"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  className="auth-input"
                />
              </View>

              <Pressable
                onPress={handleSubSubmit}
                className={clsx('auth-button', (!name.trim() || !price.trim()) && 'auth-button-disabled')}
                disabled={!name.trim() || !price.trim()}
              >
                <Text className="auth-button-text">Add Subscription</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

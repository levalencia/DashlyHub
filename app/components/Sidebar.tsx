import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SidebarItem {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  label: string;
  active?: boolean;
  subItems?: { id: string; label: string }[];
}

const sidebarItems: SidebarItem[] = [
  { id: '1', icon: 'home', label: 'Dashboard' },
  { id: '2', icon: 'calendar', label: 'Content Calendar', subItems: [
      { id: '2.1', label: 'Schedule Posts' },
      { id: '2.2', label: 'Recurring Posts' }
    ] 
  },
  { id: '3', icon: 'bell', label: 'Notifications' },
  { id: '4', icon: 'settings', label: 'Settings' }
];

interface AddFeedProps {
  onAddFeed: (feedType: string) => void;
  onClose: () => void;
}

const AddFeedModal: React.FC<AddFeedProps> = ({ onAddFeed, onClose }) => {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalOption} onPress={() => onAddFeed('linkedinUser')}>
            <Feather name="linkedin" size={20} color="#8899A6" />
            <Text style={styles.modalOptionText}>Add LinkedIn User Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => onAddFeed('twitterUser')}>
            <Feather name="twitter" size={20} color="#8899A6" />
            <Text style={styles.modalOptionText}>Add Twitter User Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => onAddFeed('twitterHashtag')}>
            <Feather name="hash" size={20} color="#8899A6" />
            <Text style={styles.modalOptionText}>Add Twitter Hashtag Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => onAddFeed('linkedinHashtag')}>
            <Feather name="hash" size={20} color="#8899A6" />
            <Text style={styles.modalOptionText}>Add LinkedIn Hashtag Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalCancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Sidebar: React.FC<{ onAddColumn: (feedType: string) => void }> = ({ onAddColumn }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width] = useState(new Animated.Value(300));
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);

  const toggleSidebar = () => {
    Animated.timing(width, {
      toValue: isCollapsed ? 300 : 68,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsCollapsed(!isCollapsed);
    setExpandedItem(null);
  };

  const toggleSubItems = (itemId: string) => {
    if (!isCollapsed) {
      setExpandedItem(expandedItem === itemId ? null : itemId);
    }
  };

  const handleAddFeed = (feedType: string) => {
    setShowAddFeedModal(false);
    onAddColumn(feedType);
  };

  return (
    <Animated.View style={[styles.sidebar, { width }]}>
      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={toggleSidebar}
      >
        <Feather 
          name={isCollapsed ? 'chevron-right' : 'chevron-left'} 
          size={20} 
          color="#8899A6" 
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Feather name="aperture" size={24} color="#1DA1F2" />
        {!isCollapsed && <Text style={styles.logoText}>Dashly Hub</Text>}
      </View>

      <View style={styles.nav}>
        {sidebarItems.map((item) => (
          <View key={item.id}>
            <TouchableOpacity
              style={[
                styles.navItem,
                item.active && styles.activeNavItem,
                isCollapsed && styles.collapsedNavItem
              ]}
              onPress={() => toggleSubItems(item.id)}
            >
              <Feather 
                name={item.icon} 
                size={20} 
                color={item.active ? "#1DA1F2" : "#8899A6"} 
              />
              {!isCollapsed && (
                <View style={styles.navItemContent}>
                  <Text style={[
                    styles.navText,
                    item.active && styles.activeNavText
                  ]}>
                    {item.label}
                  </Text>
                  {item.subItems && (
                    <Feather 
                      name={expandedItem === item.id ? 'chevron-down' : 'chevron-right'} 
                      size={16} 
                      color="#8899A6" 
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
            
            {!isCollapsed && item.subItems && expandedItem === item.id && (
              <View style={styles.subItems}>
                {item.subItems.map((subItem) => (
                  <TouchableOpacity key={subItem.id} style={styles.subItem}>
                    <Text style={styles.subItemText}>{subItem.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {!isCollapsed && (
        <TouchableOpacity style={styles.createButton} onPress={() => setShowAddFeedModal(true)}>
          <Text style={styles.createButtonText}>Add Feed</Text>
        </TouchableOpacity>
      )}
      {isCollapsed && (
        <TouchableOpacity style={styles.collapsedCreateButton} onPress={() => setShowAddFeedModal(true)}>
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {showAddFeedModal && (
        <AddFeedModal onAddFeed={handleAddFeed} onClose={() => setShowAddFeedModal(false)} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    height: '100%',
    backgroundColor: '#192734',
    paddingTop: 20,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  nav: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  navItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  navText: {
    color: '#8899A6',
    fontSize: 16,
  },
  activeNavItem: {
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
  },
  activeNavText: {
    color: '#FFFFFF',
  },
  collapsedNavItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subItems: {
    paddingLeft: 32,
  },
  subItem: {
    paddingVertical: 8,
  },
  subItemText: {
    color: '#8899A6',
  },
  createButton: {
    padding: 12,
    backgroundColor: '#1DA1F2',
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  collapsedCreateButton: {
    padding: 12,
    backgroundColor: '#1DA1F2',
    borderRadius: 50,
    margin: 16,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#192734',
    borderRadius: 8,
    padding: 16,
    width: 300,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalOptionText: {
    color: '#8899A6',
    marginLeft: 12,
    fontSize: 16,
  },
  modalCancel: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Sidebar;

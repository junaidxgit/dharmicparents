        let dashboardData = {};

        // Tab management
        function showTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            
            // Remove active state from all tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active', 'border-orange-500', 'text-orange-600');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            // Show selected tab content
            document.getElementById(`tab-content-${tabName}`).classList.remove('hidden');
            
            // Activate selected tab button
            const activeTab = document.getElementById(`tab-${tabName}`);
            activeTab.classList.add('active', 'border-orange-500', 'text-orange-600');
            activeTab.classList.remove('border-transparent', 'text-gray-500');
        }

        // Format date
        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Format currency
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(amount);
        }

        // Load dashboard data - Using mock data for development
        function loadDashboardData() {
            try {
                // Mock data that matches the sample database
                window.dashboardData = {
                    analytics: {
                        totals: {
                            users: 10,
                            assessments: 6,
                            purchases: 5,
                            revenue: 4995.00,
                            page_views: 13
                        },
                        recent_30_days: {
                            new_users: 8,
                            assessments: 5,
                            purchases: 4,
                            revenue: 3996.00
                        },
                        top_pages: [
                            { page_url: '/assessment', views: 4 },
                            { page_url: '/courses', views: 3 },
                            { page_url: '/', views: 2 },
                            { page_url: '/about', views: 2 },
                            { page_url: '/contact', views: 2 }
                        ]
                    },
                    users: [
                        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91-9876543210', source: 'organic', relationship_health_score: 85, amount_paid: 999.00, created_at: '2024-08-15T10:30:00Z' },
                        { id: 2, name: 'Arjun Singh', email: 'arjun@email.com', phone: '+91-9876543211', source: 'facebook', relationship_health_score: 72, amount_paid: 999.00, created_at: '2024-08-20T14:20:00Z' },
                        { id: 3, name: 'Deepak Sharma', email: 'deepak@email.com', phone: '+91-9876543212', source: 'google', relationship_health_score: 78, amount_paid: 999.00, created_at: '2024-08-25T09:15:00Z' },
                        { id: 4, name: 'Vikram Patel', email: 'vikram@email.com', phone: '+91-9876543213', source: 'organic', relationship_health_score: 91, amount_paid: 999.00, created_at: '2024-09-01T16:45:00Z' },
                        { id: 5, name: 'Suresh Gupta', email: 'suresh@email.com', phone: '+91-9876543214', source: 'instagram', relationship_health_score: 69, amount_paid: 999.00, created_at: '2024-09-05T11:30:00Z' },
                        { id: 6, name: 'Amit Agarwal', email: 'amit@email.com', phone: '+91-9876543215', source: 'organic', relationship_health_score: null, amount_paid: null, created_at: '2024-09-10T08:20:00Z' },
                        { id: 7, name: 'Rahul Joshi', email: 'rahul@email.com', phone: '+91-9876543216', source: 'facebook', relationship_health_score: null, amount_paid: null, created_at: '2024-09-12T13:10:00Z' },
                        { id: 8, name: 'Kiran Reddy', email: 'kiran@email.com', phone: '+91-9876543217', source: 'google', relationship_health_score: null, amount_paid: null, created_at: '2024-09-15T17:25:00Z' },
                        { id: 9, name: 'Manoj Yadav', email: 'manoj@email.com', phone: '+91-9876543218', source: 'organic', relationship_health_score: null, amount_paid: null, created_at: '2024-09-18T12:40:00Z' },
                        { id: 10, name: 'Sandeep Mishra', email: 'sandeep@email.com', phone: '+91-9876543219', source: 'instagram', relationship_health_score: null, amount_paid: null, created_at: '2024-09-20T15:55:00Z' }
                    ],
                    assessments: [
                        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', communication_score: 8, trust_score: 9, emotional_connection_score: 8, relationship_health_score: 85, completed_at: '2024-08-16T10:30:00Z' },
                        { id: 2, name: 'Arjun Singh', email: 'arjun@email.com', communication_score: 7, trust_score: 7, emotional_connection_score: 8, relationship_health_score: 72, completed_at: '2024-08-21T14:20:00Z' },
                        { id: 3, name: 'Deepak Sharma', email: 'deepak@email.com', communication_score: 8, trust_score: 7, emotional_connection_score: 8, relationship_health_score: 78, completed_at: '2024-08-26T09:15:00Z' },
                        { id: 4, name: 'Vikram Patel', email: 'vikram@email.com', communication_score: 9, trust_score: 9, emotional_connection_score: 10, relationship_health_score: 91, completed_at: '2024-09-02T16:45:00Z' },
                        { id: 5, name: 'Suresh Gupta', email: 'suresh@email.com', communication_score: 6, trust_score: 7, emotional_connection_score: 7, relationship_health_score: 69, completed_at: '2024-09-06T11:30:00Z' }
                    ],
                    purchases: [
                        { id: 1, name: 'Rajesh Kumar', email: 'rajesh@email.com', product_type: 'Father-Son Bond Building', amount_paid: 999.00, has_community_addon: true, payment_id: 'pay_rajesh123', payment_status: 'completed', purchased_at: '2024-08-17T10:30:00Z' },
                        { id: 2, name: 'Arjun Singh', email: 'arjun@email.com', product_type: 'Father-Son Bond Building', amount_paid: 999.00, has_community_addon: false, payment_id: 'pay_arjun456', payment_status: 'completed', purchased_at: '2024-08-22T14:20:00Z' },
                        { id: 3, name: 'Deepak Sharma', email: 'deepak@email.com', product_type: 'Father-Son Bond Building', amount_paid: 999.00, has_community_addon: true, payment_id: 'pay_deepak789', payment_status: 'completed', purchased_at: '2024-08-27T09:15:00Z' },
                        { id: 4, name: 'Vikram Patel', email: 'vikram@email.com', product_type: 'Father-Son Bond Building', amount_paid: 999.00, has_community_addon: false, payment_id: 'pay_vikram012', payment_status: 'completed', purchased_at: '2024-09-03T16:45:00Z' },
                        { id: 5, name: 'Suresh Gupta', email: 'suresh@email.com', product_type: 'Father-Son Bond Building', amount_paid: 999.00, has_community_addon: true, payment_id: 'pay_suresh345', payment_status: 'completed', purchased_at: '2024-09-07T11:30:00Z' }
                    ]
                };
                
                updateDashboard();
                
            } catch (error) {
                console.error('Error loading dashboard data:', error);
                document.getElementById('loading').innerHTML = '<div class="text-center py-12"><i class="fas fa-exclamation-triangle text-4xl text-red-600 mb-4"></i><p class="text-gray-600">Failed to load dashboard data</p><button onclick="refreshData()" class="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg">Try Again</button></div>';
            }
        }

        // Update dashboard with loaded data
        function updateDashboard() {
            const { analytics, users, assessments, purchases } = window.dashboardData;
            
            // Update stats
            document.getElementById('stat-users').textContent = analytics.totals.users;
            document.getElementById('stat-users-recent').textContent = analytics.recent_30_days.new_users;
            document.getElementById('stat-assessments').textContent = analytics.totals.assessments;
            document.getElementById('stat-assessments-recent').textContent = analytics.recent_30_days.assessments;
            document.getElementById('stat-purchases').textContent = analytics.totals.purchases;
            document.getElementById('stat-purchases-recent').textContent = analytics.recent_30_days.purchases;
            document.getElementById('stat-revenue').textContent = formatCurrency(analytics.totals.revenue);
            
            // Update top pages
            const topPagesHtml = analytics.top_pages.map(page => `
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-800">${page.page_url}</span>
                    <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${page.views} views
                    </span>
                </div>
            `).join('');
            document.getElementById('top-pages').innerHTML = topPagesHtml || '<p class="text-gray-500">No page views yet</p>';
            
            // Update users table
            const usersHtml = users.map(user => `
                <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">${user.name || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${user.email}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${user.phone || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">${user.source}</span>
                    </td>
                    <td class="px-4 py-2 text-sm ${user.relationship_health_score ? 'font-bold text-green-600' : 'text-gray-400'}">
                        ${user.relationship_health_score || 'No assessment'}
                    </td>
                    <td class="px-4 py-2 text-sm ${user.amount_paid ? 'font-bold text-purple-600' : 'text-gray-400'}">
                        ${user.amount_paid ? formatCurrency(user.amount_paid) : 'No purchase'}
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-600">${formatDate(user.created_at)}</td>
                </tr>
            `).join('');
            document.getElementById('users-table').innerHTML = usersHtml || '<tr><td colspan="7" class="text-center py-4 text-gray-500">No users yet</td></tr>';
            
            // Update assessments table
            const assessmentsHtml = assessments.map(assessment => `
                <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">${assessment.name}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${assessment.email}</td>
                    <td class="px-4 py-2 text-sm font-bold text-green-600">${assessment.relationship_health_score}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${assessment.communication_score || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${assessment.trust_score || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${assessment.emotional_connection_score || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${formatDate(assessment.completed_at)}</td>
                </tr>
            `).join('');
            document.getElementById('assessments-table').innerHTML = assessmentsHtml || '<tr><td colspan="7" class="text-center py-4 text-gray-500">No assessments yet</td></tr>';
            
            // Update purchases table
            const purchasesHtml = purchases.map(purchase => `
                <tr>
                    <td class="px-4 py-2 text-sm font-medium text-gray-900">${purchase.name}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${purchase.email}</td>
                    <td class="px-4 py-2 text-sm text-gray-600">${purchase.product_type}</td>
                    <td class="px-4 py-2 text-sm font-bold text-purple-600">${formatCurrency(purchase.amount_paid)}</td>
                    <td class="px-4 py-2 text-sm">
                        <span class="${purchase.has_community_addon ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} px-2 py-1 rounded text-xs">
                            ${purchase.has_community_addon ? 'Yes' : 'No'}
                        </span>
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-600 font-mono">${purchase.payment_id || 'N/A'}</td>
                    <td class="px-4 py-2 text-sm">
                        <span class="${purchase.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded text-xs">
                            ${purchase.payment_status}
                        </span>
                    </td>
                    <td class="px-4 py-2 text-sm text-gray-600">${formatDate(purchase.purchased_at)}</td>
                </tr>
            `).join('');
            document.getElementById('purchases-table').innerHTML = purchasesHtml || '<tr><td colspan="8" class="text-center py-4 text-gray-500">No purchases yet</td></tr>';
            
            // Hide loading and show content
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('dashboard-content').classList.remove('hidden');
        }

        // Refresh data
        function refreshData() {
            document.getElementById('loading').classList.remove('hidden');
            document.getElementById('dashboard-content').classList.add('hidden');
            loadDashboardData();
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', function() {
            loadDashboardData();
        });

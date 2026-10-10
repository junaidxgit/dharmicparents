export function getPurchaseEmailHTML(name: string, amount: number, paymentId: string): string {
  const firstName = name.split(' ')[0];
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Dharmic Transformation Package</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Georgia', 'Times New Roman', serif; background-color: #f9fafb;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ff6b35 0%, #f97316 50%, #ea580c 100%); padding: 40px 30px; text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🕉️</div>
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 10px 0; letter-spacing: 2px; font-weight: bold;">DHARMIC PARENTS</h1>
                            <p style="color: #fff5ee; font-size: 16px; margin: 0; font-style: italic;">Transform Your Father-Son Relationship</p>
                        </td>
                    </tr>
                    
                    <!-- Success Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #fff5ee 0%, #fed7aa 100%); padding: 30px; text-align: center; border-bottom: 4px solid #f97316;">
                            <div style="font-size: 64px; margin-bottom: 15px;">✓</div>
                            <h2 style="color: #f97316; font-size: 28px; margin: 0 0 10px 0;">🎉 Welcome, ${firstName}!</h2>
                            <p style="color: #555; font-size: 18px; line-height: 1.6; margin: 0;">Your Sacred Journey to Father-Son Transformation Begins Now</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="color: #333; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
                                Thank you for investing in your relationship with your son. This is a profound step toward restoring respect, deepening connection, and creating a lasting dharmic legacy.
                            </p>
                            
                            <!-- Purchase Confirmation Box -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: #fff5ee; border: 2px solid #f97316; border-radius: 10px; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #f97316; font-size: 20px; margin: 0 0 15px 0;">📄 Purchase Confirmation</h3>
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td style="color: #666; font-size: 14px;">Order ID:</td>
                                                <td style="color: #333; font-size: 14px; font-weight: bold; text-align: right;">${paymentId}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666; font-size: 14px;">Amount Paid:</td>
                                                <td style="color: #059669; font-size: 16px; font-weight: bold; text-align: right;">₹${amount}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666; font-size: 14px;">Package:</td>
                                                <td style="color: #333; font-size: 14px; font-weight: bold; text-align: right;">Transformation Guide</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #666; font-size: 14px;">Status:</td>
                                                <td style="color: #059669; font-size: 14px; font-weight: bold; text-align: right;">✓ Completed</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- PDF Attachment Notice -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 10px; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <div style="font-size: 40px; margin-bottom: 10px;">📎</div>
                                        <h3 style="color: #1e40af; font-size: 20px; margin: 0 0 10px 0;">Your Complete Package is Attached!</h3>
                                        <p style="color: #1e40af; font-size: 15px; line-height: 1.6; margin: 0;">
                                            Download the PDF attachment above to access your 47-page transformation guide, sacred conversation starters, 30-day action plan, and emergency response guide.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- What's Inside -->
                            <h3 style="color: #333; font-size: 22px; margin: 30px 0 20px 0;">✨ What's Inside Your Package:</h3>
                            
                            <table width="100%" cellpadding="12" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="background: #fff5ee; border-left: 4px solid #f97316; padding: 15px; border-radius: 5px;">
                                        <p style="color: #f97316; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">📜 47-Page Transformation Guide</p>
                                        <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.6;">Complete roadmap with ancient dharmic principles for modern fathers</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table width="100%" cellpadding="12" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="background: #fff5ee; border-left: 4px solid #f97316; padding: 15px; border-radius: 5px;">
                                        <p style="color: #f97316; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">💬 7 Sacred Conversation Starters</p>
                                        <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.6;">Proven dialogue techniques that restore respect and deepen connection</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table width="100%" cellpadding="12" cellspacing="0" style="margin-bottom: 20px;">
                                <tr>
                                    <td style="background: #fff5ee; border-left: 4px solid #f97316; padding: 15px; border-radius: 5px;">
                                        <p style="color: #f97316; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">📅 30-Day Action Plan</p>
                                        <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.6;">Daily spiritual tasks for lasting transformation and measurable results</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table width="100%" cellpadding="12" cellspacing="0" style="margin-bottom: 30px;">
                                <tr>
                                    <td style="background: #fff5ee; border-left: 4px solid #f97316; padding: 15px; border-radius: 5px;">
                                        <p style="color: #f97316; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">🚨 Emergency Response Guide</p>
                                        <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.6;">Handle conflicts with dharmic wisdom and practical solutions</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border: 2px solid #059669; border-radius: 10px; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #065f46; font-size: 20px; margin: 0 0 15px 0; text-align: center;">🚀 Your Next Steps:</h3>
                                        
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td width="40" style="vertical-align: top;">
                                                    <div style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold;">1</div>
                                                </td>
                                                <td style="color: #065f46; font-size: 15px; line-height: 1.6;">
                                                    <strong>Download the PDF attachment</strong> and save it to your device
                                                </td>
                                            </tr>
                                            <tr><td colspan="2" style="height: 10px;"></td></tr>
                                            <tr>
                                                <td width="40" style="vertical-align: top;">
                                                    <div style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold;">2</div>
                                                </td>
                                                <td style="color: #065f46; font-size: 15px; line-height: 1.6;">
                                                    <strong>Read the Quick Start Guide</strong> (first 10 pages) to see results in 24 hours
                                                </td>
                                            </tr>
                                            <tr><td colspan="2" style="height: 10px;"></td></tr>
                                            <tr>
                                                <td width="40" style="vertical-align: top;">
                                                    <div style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold;">3</div>
                                                </td>
                                                <td style="color: #065f46; font-size: 15px; line-height: 1.6;">
                                                    <strong>Try your first conversation</strong> tonight at dinner
                                                </td>
                                            </tr>
                                            <tr><td colspan="2" style="height: 10px;"></td></tr>
                                            <tr>
                                                <td width="40" style="vertical-align: top;">
                                                    <div style="background: #059669; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold;">4</div>
                                                </td>
                                                <td style="color: #065f46; font-size: 15px; line-height: 1.6;">
                                                    <strong>Follow the 30-day plan</strong> for lasting transformation
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Guarantee -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 10px; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <div style="font-size: 40px; margin-bottom: 10px;">🛡️</div>
                                        <h3 style="color: #92400e; font-size: 20px; margin: 0 0 10px 0;">60-Day Sacred Guarantee</h3>
                                        <p style="color: #78350f; font-size: 15px; line-height: 1.7; margin: 0;">
                                            Your dharmic investment is completely protected. We stand behind the quality and effectiveness of this transformation guide for 60 days.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Support -->
                    <tr>
                        <td style="background: #f9fafb; padding: 30px; text-align: center; border-top: 2px solid #e5e7eb;">
                            <h3 style="color: #374151; font-size: 18px; margin: 0 0 10px 0;">Need Dharmic Guidance?</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">
                                Our support team is dedicated to your transformation success
                            </p>
                            <a href="mailto:dharmicparents@gmail.com" style="background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                                Contact Support
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: #374151; padding: 30px; text-align: center;">
                            <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
                                <strong style="color: #f97316;">Dharmic Parents</strong>
                            </p>
                            <p style="color: #9ca3af; font-size: 13px; margin: 0 0 5px 0;">
                                www.dharmicparents.com
                            </p>
                            <p style="color: #6b7280; font-size: 12px; margin: 15px 0 0 0;">
                                © 2025 Dharmic Parents. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
}

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 11, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                JusticeDesk ("we," "us," "our," or "the Platform") is committed to protecting your privacy and ensuring you have a positive experience on our Platform. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-foreground">
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Platform.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <p className="text-foreground">We may collect personal information that you voluntarily provide, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground mt-2">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Profile information (avatar, bio, preferences)</li>
                  <li>Legal case details and documents you upload</li>
                  <li>Consultation records and communications with advocates</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                <p className="text-foreground">When you use JusticeDesk, we automatically collect certain information, including:</p>
                <ul className="list-disc list-inside space-y-1 text-foreground mt-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages viewed, time spent, actions taken)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (if permitted)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">We use the information we collect for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li><span className="font-semibold">Service Delivery:</span> To provide, maintain, and improve our Platform and services</li>
                <li><span className="font-semibold">Communication:</span> To send you service-related announcements and support messages</li>
                <li><span className="font-semibold">Legal Assistance:</span> To connect you with qualified advocates and facilitate consultations</li>
                <li><span className="font-semibold">Personalization:</span> To customize your experience and provide relevant legal information</li>
                <li><span className="font-semibold">Analytics:</span> To analyze usage patterns and improve our Platform</li>
                <li><span className="font-semibold">Compliance:</span> To comply with legal obligations and enforce our Terms and Services</li>
                <li><span className="font-semibold">Security:</span> To detect, prevent, and address fraud and security issues</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">4. Sharing and Disclosure of Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li><span className="font-semibold">With Legal Professionals:</span> When you request consultation with advocates, we share necessary case information with them</li>
                <li><span className="font-semibold">With Service Providers:</span> With third parties who assist us in operating our Platform and conducting business</li>
                <li><span className="font-semibold">Legal Requirements:</span> When required by law, court order, or government request</li>
                <li><span className="font-semibold">Business Transfers:</span> In case of merger, acquisition, or sale of assets</li>
                <li><span className="font-semibold">Your Consent:</span> With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Secure password hashing for stored credentials</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and user authentication</li>
                <li>Employee training on data privacy and security</li>
              </ul>
              <p className="text-foreground mt-3">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">6. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li><span className="font-semibold">Right to Access:</span> You have the right to request access to the personal information we hold about you</li>
                <li><span className="font-semibold">Right to Correction:</span> You can request correction of inaccurate or incomplete information</li>
                <li><span className="font-semibold">Right to Deletion:</span> You may request deletion of your personal information, subject to legal obligations</li>
                <li><span className="font-semibold">Right to Opt-Out:</span> You can opt out of marketing communications at any time</li>
                <li><span className="font-semibold">Right to Data Portability:</span> You can request a copy of your data in a portable format</li>
              </ul>
              <p className="text-foreground mt-3">
                To exercise these rights, please contact us at privacy@justicedesk.com with your request.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">7. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                JusticeDesk uses cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and understand your usage patterns.
              </p>
              <p className="text-foreground">
                You can control cookies through your browser settings. However, disabling cookies may affect some functionality of our Platform. We use analytics tools to understand how users interact with our services.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                JusticeDesk is not directed to children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete such information promptly.
              </p>
              <p className="text-foreground">
                Parents or guardians who believe their child has provided information to JusticeDesk should contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">9. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Our Platform may contain links to third-party websites and services that are not operated by JusticeDesk. This Privacy Policy does not apply to such third-party websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party services before providing your information.
              </p>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">10. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using JusticeDesk, you consent to the transfer of your information to countries outside your country of residence.
              </p>
            </CardContent>
          </Card>

          {/* Section 11 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">11. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by posting the updated Privacy Policy on our Platform and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl">Questions About Our Privacy Practices?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                If you have questions, concerns, or complaints about our privacy practices, please contact us:
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-foreground font-medium">JusticeDesk Privacy Team</p>
                <p className="text-foreground">Email: privacy@justicedesk.com</p>
                <p className="text-foreground">Address: New Delhi, India</p>
                <p className="text-foreground">Phone: +91-11-XXXX-XXXX</p>
              </div>
              <p className="text-foreground mt-4">
                We will respond to your inquiry within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Action */}
        <div className="mt-12 flex justify-center">
          <Button variant="hero" onClick={() => navigate(-1)}>
            I Understand and Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsAndServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">Terms and Services</h1>
          <p className="text-muted-foreground">Last updated: December 11, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                By accessing and using JusticeDesk ("the Platform"), you accept and agree to be bound by and abide by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-foreground">
                JusticeDesk is a legal information and case management platform designed to help citizens understand their legal rights, manage legal documents, and connect with qualified legal professionals.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                Permission is granted to temporarily download one copy of the materials (information or software) on JusticeDesk for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Platform</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Uploading false, misleading, or illegal documents</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3. Disclaimer of Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                The materials on JusticeDesk are provided on an "as-is" basis. JusticeDesk makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p className="text-foreground font-semibold text-accent">
                ⚠️ Legal Disclaimer: The information provided on JusticeDesk is for general informational purposes only and does not constitute legal advice. You should not rely solely on this Platform for legal matters. Consult with a qualified attorney for advice specific to your situation.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">4. Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                In no event shall JusticeDesk or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on JusticeDesk, even if JusticeDesk or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5. Accuracy of Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                The materials appearing on JusticeDesk could include technical, typographical, or photographic errors. JusticeDesk does not warrant that any of the materials on the Platform are accurate, complete, or current. JusticeDesk may make changes to the materials contained on the Platform at any time without notice.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">6. Materials and Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                JusticeDesk has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by JusticeDesk of the site. Use of any such linked website is at the user's own risk.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">7. Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                JusticeDesk may revise these terms of service for the Platform at any time without notice. By using the Platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">8. User Accounts and Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                When you create an account on JusticeDesk, you are responsible for maintaining the confidentiality of your password and account information. You agree to accept responsibility for all activities that occur under your account. You must immediately notify JusticeDesk of any unauthorized use of your account.
              </p>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">9. Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                You agree not to use JusticeDesk for any purpose that is unlawful or prohibited by these terms and conditions. Specifically, you agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Post or transmit any defamatory, offensive, or illegal content</li>
                <li>Harass, abuse, or threaten other users or advocates</li>
                <li>Attempt to gain unauthorized access to the Platform</li>
                <li>Upload malware or viruses</li>
                <li>Impersonate another person or entity</li>
                <li>Engage in any form of fraud or deception</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">10. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in India.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl">Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">
                If you have any questions about these Terms and Services, please contact us at:
              </p>
              <div className="mt-4 space-y-1">
                <p className="text-foreground font-medium">JusticeDesk Support</p>
                <p className="text-foreground">Email: support@justicedesk.com</p>
                <p className="text-foreground">Address: New Delhi, India</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Action */}
        <div className="mt-12 flex justify-center">
          <Button variant="hero" onClick={() => navigate(-1)}>
            Accept and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndServices;

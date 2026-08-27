import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Phone, Shield, Upload, LogOut, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, updateProfile, uploadAvatar, signOut } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [barNumber, setBarNumber] = useState(user?.barNumber || '');
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setPhone(user?.phone || '');
    setBarNumber(user?.barNumber || '');
    setAvatarPreview(user?.avatar);
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      toast({ title: 'Error', description: 'Name cannot be empty', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      let finalAvatar = avatarPreview;
      if (avatarPreview && avatarPreview.startsWith('data:')) {
        const res = await uploadAvatar(avatarPreview);
        if (res.success && res.url) {
          finalAvatar = res.url;
        }
      }

      const res = await updateProfile({
        name,
        phone,
        barNumber: user?.role === 'lawyer' ? barNumber : undefined,
        avatar: finalAvatar,
      });

      if (res.success) {
        toast({ title: 'Profile Updated', description: 'Your account details have been saved.' });
      } else {
        toast({ title: 'Error', description: res.error || 'Failed to update profile', variant: 'destructive' });
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to save profile', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    toast({ title: 'Signed Out', description: 'You have been logged out of your session.' });
    navigate('/login');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your personal details and preferences</p>
        </div>
        <Badge variant="outline" className="capitalize px-3 py-1 text-sm border-primary/30 text-primary">
          {user?.role || 'Citizen'} Account
        </Badge>
      </div>

      <Card className="border border-border shadow-sm">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Details
          </CardTitle>
          <CardDescription>Update your display name, contact information, and avatar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          {/* Avatar Upload */}
          <div className="flex items-center gap-6 pb-2">
            <Avatar className="w-20 h-20 border-2 border-primary/20 shadow-sm">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                {(name || 'U').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <Label htmlFor="avatar-upload" className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Change Profile Photo
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG or GIF up to 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                Email Address
              </Label>
              <Input value={email} readOnly className="bg-muted/50 cursor-not-allowed" />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {user?.role === 'lawyer' && (
              <div className="space-y-2">
                <Label className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                  Bar Registration Number
                </Label>
                <Input
                  value={barNumber}
                  onChange={(e) => setBarNumber(e.target.value)}
                  placeholder="State Bar Registration No."
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="destructive" size="sm" onClick={handleSignOut} className="gap-1.5">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="hero" size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

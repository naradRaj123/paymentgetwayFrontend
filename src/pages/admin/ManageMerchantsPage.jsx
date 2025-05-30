
import React, { useState } from 'react';
import { usePayment } from '@/contexts/PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, Search, Link as LinkIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageMerchantsPage = () => {
  const { merchants, addMerchant, updateMerchant, deleteMerchant } = usePayment();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMerchant, setCurrentMerchant] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', companyName: '', website: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (merchant = null) => {
    setCurrentMerchant(merchant);
    setFormData(merchant ? { name: merchant.name, email: merchant.email, companyName: merchant.companyName || '', website: merchant.website || '' } : { name: '', email: '', companyName: '', website: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMerchant(null);
    setFormData({ name: '', email: '', companyName: '', website: '' });
  };

  const handleSubmit = () => {
    if (currentMerchant) {
      updateMerchant(currentMerchant.id, {...formData, role: 'merchant'});
    } else {
      addMerchant({...formData, role: 'merchant'});
    }
    closeModal();
  };

  const handleDelete = (merchantId) => {
    deleteMerchant(merchantId);
  };

  const filteredMerchants = merchants.filter(merchant => 
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (merchant.companyName && merchant.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Merchants</h1>
          <p className="text-muted-foreground">Add, edit, or remove merchants.</p>
        </div>
        <Button onClick={() => openModal()}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Merchant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Merchant List</CardTitle>
          <CardDescription>A list of all merchants using the platform.</CardDescription>
           <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search merchants..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredMerchants.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No merchants found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Joined</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {filteredMerchants.map(merchant => (
                    <tr key={merchant.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{merchant.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{merchant.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{merchant.companyName || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {merchant.website ? <a href={merchant.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center"><LinkIcon size={14} className="mr-1"/>Visit</a> : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{new Date(merchant.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => openModal(merchant)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the merchant {merchant.companyName || merchant.name}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(merchant.id)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{currentMerchant ? 'Edit Merchant' : 'Add New Merchant'}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Contact Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" name="website" type="url" value={formData.website} onChange={handleInputChange} />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>{currentMerchant ? 'Save Changes' : 'Add Merchant'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ManageMerchantsPage;

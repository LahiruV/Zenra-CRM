import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { Card, Button, Input, Select } from '../widgets';
import { authService } from '../functions/authService';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

/**
 * Register page with form validation and user registration
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Sales Representative'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { label: 'Sales Representative', value: 'Sales Representative' },
    { label: 'Sales Manager', value: 'Sales Manager' },
    { label: 'Account Manager', value: 'Account Manager' },
    { label: 'Marketing Manager', value: 'Marketing Manager' },
    { label: 'Customer Success Manager', value: 'Customer Success Manager' },
    { label: 'Administrator', value: 'Administrator' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Clear confirm password error if passwords now match
    if (field === 'password' && formData.confirmPassword && value === formData.confirmPassword) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
    
    if (field === 'confirmPassword' && formData.password && value === formData.password) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    dispatch(loginStart());

    try {
      const response = await authService.register({
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.success) {
        dispatch(loginSuccess(response.data.user));
        
        toast.success('Registration successful!', {
          description: `Welcome to the CRM system, ${response.data.user.name}!`
        });

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch(loginFailure(errorMessage));
      
      toast.error('Registration Failed', {
        description: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {/* Registration Form */}
        <Card className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  placeholder="Enter your full name"
                  leftIcon={<User className="w-4 h-4" />}
                  fullWidth
                  autoComplete="name"
                />
              </div>

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  placeholder="Enter your email"
                  leftIcon={<Mail className="w-4 h-4" />}
                  fullWidth
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <Select
                label="Role"
                options={roleOptions}
                value={formData.role}
                onChange={(value) => handleInputChange('role', value)}
                error={errors.role}
                placeholder="Select your role"
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  error={errors.password}
                  placeholder="Create a password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  fullWidth
                  autoComplete="new-password"
                  helperText="Must be at least 8 characters with uppercase, lowercase, and number"
                />
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  error={errors.confirmPassword}
                  placeholder="Confirm your password"
                  leftIcon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  fullWidth
                  autoComplete="new-password"
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </Card>

        {/* Terms */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-600">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
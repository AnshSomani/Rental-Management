import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = () => {
        let score = 0;
        if (!password) return 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = getStrength();
    const strengthText = ['Very Weak', 'Weak', 'Okay', 'Good', 'Strong'][strength];
    const color = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'][strength];

    return (
        <div className="flex items-center gap-2 mt-1">
            <div className="w-full bg-gray-600 rounded-full h-2">
                <div className={`h-2 rounded-full transition-all duration-300 ${color}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
            </div>
            <span className="text-xs text-gray-300 w-20 text-right">{strengthText}</span>
        </div>
    );
};

export default PasswordStrengthMeter;

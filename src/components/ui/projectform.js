// app/components/ProjectForm.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, ImagePlus, X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const ImageUploader = ({ image, onImageChange, className = "" }) => {
    const [dragging, setDragging] = useState(false);
    const inputId = React.useId(); // Generate unique ID for input

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileSelect(file);
        }
    };

    const handleFileSelect = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            onImageChange({
                file,
                preview: e.target.result,
            });
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    return (
        <div
            className={`relative ${className}`}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id={inputId}
            />
            {image?.preview ? (
                <div className="relative group cursor-pointer"
                     onClick={() => document.getElementById(inputId).click()}>
                    <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <ImagePlus className="w-8 h-8 text-white" />
                    </div>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${dragging ? 'border-primary bg-primary/10' : 'border-gray-300'}
                    hover:border-primary hover:bg-primary/5`}
                    onClick={() => document.getElementById(inputId).click()}
                >
                    <Upload className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                        Drop your image here or click to upload
                    </p>
                </div>
            )}
        </div>
    );
};

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mainImage: null,
        logo: '',
        description: '',
        className: '',
        info: {
            description: '',
            tags: [{ category: '' }]
        },
        page: {
            about: '',
            images: [{
                file: null,
                preview: '',
                alt: '',
                hoverTitle: '',
                hoverSubtitle: ''
            }]
        }
    });

    const handleChange = (e, field, nestedField = null, index = null, subField = null) => {
        const value = e.target.value;
        setFormData(prev => {
            if (nestedField && index !== null && subField) {
                // Handle nested array objects (images)
                const newData = { ...prev };
                newData[field][nestedField][index][subField] = value;
                return newData;
            } else if (nestedField && index !== null) {
                // Handle array objects (tags)
                const newData = { ...prev };
                newData[field][nestedField][index] = { category: value };
                return newData;
            } else if (nestedField) {
                // Handle nested objects
                return {
                    ...prev,
                    [field]: {
                        ...prev[field],
                        [nestedField]: value
                    }
                };
            }
            // Handle top-level fields
            return { ...prev, [field]: value };
        });
    };

    const handleMainImageChange = (imageData) => {
        setFormData(prev => ({
            ...prev,
            mainImage: imageData
        }));
    };

    const handleProjectImageChange = (imageData, index) => {
        setFormData(prev => {
            const newImages = [...prev.page.images];
            newImages[index] = {
                ...newImages[index],
                file: imageData.file,
                preview: imageData.preview
            };
            return {
                ...prev,
                page: {
                    ...prev.page,
                    images: newImages
                }
            };
        });
    };

    const addTag = () => {
        setFormData(prev => ({
            ...prev,
            info: {
                ...prev.info,
                tags: [...prev.info.tags, { category: '' }]
            }
        }));
    };

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            info: {
                ...prev.info,
                tags: prev.info.tags.filter((_, i) => i !== index)
            }
        }));
    };

    const addImage = () => {
        setFormData(prev => ({
            ...prev,
            page: {
                ...prev.page,
                images: [...prev.page.images, {
                    file: null,
                    preview: '',
                    alt: '',
                    hoverTitle: '',
                    hoverSubtitle: ''
                }]
            }
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            page: {
                ...prev.page,
                images: prev.page.images.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append main image
        if (formData.mainImage?.file) {
            formDataToSend.append('mainImage', formData.mainImage.file);
        }

        // Append project images
        formData.page.images.forEach((image, index) => {
            if (image.file) {
                formDataToSend.append(`projectImage${index}`, image.file);
            }
        });

        // Append other form data
        const dataToSend = {
            name: formData.name,
            logo: formData.logo,
            description: formData.description,
            className: formData.className,
            info: formData.info,
            page: {
                about: formData.page.about,
                images: formData.page.images.map(img => ({
                    alt: img.alt,
                    hoverTitle: img.hoverTitle,
                    hoverSubtitle: img.hoverSubtitle
                }))
            }
        };

        formDataToSend.append('data', JSON.stringify(dataToSend));

        try {
            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formDataToSend
            });

            if (response.ok) {
                console.log('Project saved successfully');
                // Add your success handling here (e.g., redirect, show success message)
            } else {
                const error = await response.json();
                console.error('Error saving project:', error);
                // Add your error handling here
            }
        } catch (error) {
            console.error('Error saving project:', error);
            // Add your error handling here
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Project Name</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => handleChange(e, 'name')}
                            placeholder="Kitchen Renovation"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Main Image</label>
                        <ImageUploader
                            image={formData.mainImage}
                            onImageChange={handleMainImageChange}
                            className="mb-4"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Logo URL</label>
                        <Input
                            value={formData.logo}
                            onChange={(e) => handleChange(e, 'logo')}
                            placeholder="/logo.png"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Short Description</label>
                        <Input
                            value={formData.description}
                            onChange={(e) => handleChange(e, 'description')}
                            placeholder="Transforming your kitchen space"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">CSS Class Name</label>
                        <Input
                            value={formData.className}
                            onChange={(e) => handleChange(e, 'className')}
                            placeholder="custom-class"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Detailed Information</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Detailed Description</label>
                        <Textarea
                            value={formData.info.description}
                            onChange={(e) => handleChange(e, 'info', 'description')}
                            placeholder="Detailed project description"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">About Text</label>
                        <Textarea
                            value={formData.page.about}
                            onChange={(e) => handleChange(e, 'page', 'about')}
                            placeholder="Detailed about section"
                            rows={4}
                            
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                        Add Tag
                    </Button>
                </div>

                <div className="space-y-2">
                    {formData.info.tags.map((tag, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <Input
                                value={tag.category}
                                onChange={(e) => handleChange(e, 'info', 'tags', index)}
                                placeholder="Tag category"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTag(index)}
                                className="h-10 w-10"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Project Images</h3>
                    <Button type="button" onClick={addImage} variant="outline" size="sm">
                        Add Image
                    </Button>
                </div>

                {formData.page.images.map((image, index) => (
                    <Card key={index} className="p-4">
                        <CardContent className="space-y-4">
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeImage(index)}
                                    className="h-8 w-8"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <ImageUploader
                                image={{ file: image.file, preview: image.preview }}
                                onImageChange={(imageData) => handleProjectImageChange(imageData, index)}
                            />

                            <div>
                                <label className="block text-sm font-medium mb-1">Alt Text</label>
                                <Input
                                    value={image.alt}
                                    onChange={(e) => handleChange(e, 'page', 'images', index, 'alt')}
                                    placeholder="Kitchen renovation progress"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hover Title</label>
                                    <Input
                                        value={image.hoverTitle}
                                        onChange={(e) => handleChange(e, 'page', 'images', index, 'hoverTitle')}
                                        placeholder="Kitchen Renovation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Hover Subtitle</label>
                                    <Input
                                        value={image.hoverSubtitle}
                                        onChange={(e) => handleChange(e, 'page', 'images', index, 'hoverSubtitle')}
                                        placeholder="Cool kitchen renovation"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end">
                <Button type="submit" size="lg" className="bg-black hover:text-black w-full">
                    Save Project
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
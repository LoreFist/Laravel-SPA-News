<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class News extends Model
{

    protected $fillable
        = [
            'categories_id',
            'title',
            'body',
            'created_at',
            'updated_at',
        ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }

}

package com.bosspiration;



// import com.facebook.react.ReactActivity;

import android.annotation.TargetApi;
import android.os.Build;
import android.widget.ImageView;

import android.os.Bundle;
import androidx.annotation.Nullable;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setSplashLayout();
    }

    // /**


    private void setSplashLayout() {
        ImageView img = new ImageView(this);
        img.setImageDrawable(getDrawable(R.drawable.logo));
        setContentView(img);
    }

}
